import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8081});

//Conn event
wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString();
        console.log({message});

        wss.clients.forEach((client) => {
            if(client.readyState === 1)
                client.send(`Server Broadcast received ${message}`);
        });
    });
    socket.on('error', (err) => {
        console.error(`Error: ${err}: ${ip}`);
    });
    socket.on('close', () => {
        console.log('Connection closed');
    })
})

console.log('Server started at http://localhost:8081');