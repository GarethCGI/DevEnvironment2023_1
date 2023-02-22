import axios from 'axios'
import WebSocket from 'ws'
import https from 'https'

function toBuffer(obj: any | string) {
	if (typeof obj === 'string') {
		return Buffer.from(obj)
	}
	return Buffer.from(JSON.stringify(obj))
}

function getStatusFromWS(pteroDomain: string, pteroKey: string, id: string) {
	return new Promise<{ online: boolean }>((resolve, reject) => {
		axios
			.get(`https://${pteroDomain}/api/client/servers/${id}/websocket`, {
				headers: {
					Authorization: `Bearer ${pteroKey}`,
				},
			})
			.then((tokenres) => {
				const { token, socket } = tokenres.data.data;
				const ws = new WebSocket(socket, {
					origin: `https://${pteroDomain}`,
				});
				ws.onopen = () => {
					ws.send(toBuffer({ event: "auth", args: [token] }));
				};
				ws.onmessage = (event) => {
					const data = JSON.parse(event.data.toString());
					if (!data) {
						console.log("Error receiving data from websocket");
						reject({ online: false });
					}
					if (data.event === "auth success") {
						ws.send(toBuffer({ event: "send stats", args: [null] }));
					}
					if (data.event === "status") {
						if (data.args[0] === "running") {
							ws.close();
							resolve({ online: true });
						} else {
							ws.close();
							resolve({ online: false });
						}
					}
					if (data.event === "token expired") {
						ws.close();
						reject({ online: false });
					}
					ws.close();
				};
				ws.onerror = (event) => {
					console.log("Error in websocket");
					console.log(event);
					reject({ online: false });
				};
				ws.onclose = (event) => {
					reject({ online: false });
				};
			})
			.catch(() => {
				console.log("Error fetching token");
				reject({ online: false });
			});
	});
}



export default defineEventHandler(async (event) => {
	const { hostUrl } = await readBody(event)
	if (!hostUrl) {
		console.log("Invalid Host: " + hostUrl)
		return { online: false }
	}
	if (typeof hostUrl !== 'string') {
		console.log("Invalid Host: " + hostUrl)
		return { online: false }
	}
	const { allowedHosts } = useRuntimeConfig()
	let found = false
	for (let i = 0; i < allowedHosts.length; i++) {
		const domainRegex = new RegExp(`^https?:\/\/(.+)${allowedHosts[i]}(:\d+)?\/?$`)
		const domain = hostUrl.match(domainRegex)
		if (domain) {
			found = true
			break
		}
	}
	if (!found) {
		console.log("Invalid Host: " + hostUrl)
		return { online: false }
	}
	//return { online: false }
	//any domain starting with dev- is sent differently
	// editor urls look like this: https://dev-<id>.<domain>
	const editorRegex = new RegExp(`^https?:\/\/dev-`)
	if (!hostUrl.match(editorRegex)) {
		const response = await axios.get(hostUrl, {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false // Ignore Self-Signed Certs
			})
		}).catch((e) => {
			console.log("Error fetching host")
			console.log(hostUrl)
			return { status: 404, online: false }
		})
		if (response.status === 200) {
			//console.log("Host Online: " + hostUrl)
			return { online: true }
		} else {
			//console.log("Host Offline: " + hostUrl)
			return { online: false }
		}
	}
	else {
		const { pteroDomain, pteroKey } = useRuntimeConfig()
		const idRegex = new RegExp(`^https?:\/\/dev-(.+)\\.`)
		const id = hostUrl.match(idRegex)?.[1].split('.')[0]
		if (!id) {
			console.log("Editor Host Invalid: " + hostUrl)
			return { online: false }
		}
		const status = await getStatusFromWS(pteroDomain, pteroKey, id)
			.catch(() => {
				console.log("Error fetching status from websocket")
				return { online: false }
			})
		return status
	}
})
