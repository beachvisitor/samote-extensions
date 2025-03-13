const ngrok = require('ngrok');

const options = {
    authtoken: '',
    hostname: ''
};

module.exports = async ({ events, server, express, url }) => {
    let def = url.url;
    const prefix = '[TUNNEL]';
    const trustProxy = express.get('trust proxy');

    try {
        // Waiting for the server to start to access process.env.PORT
        !server.listening && await new Promise(resolve => server.on('listening', resolve));

        const tunnel = await ngrok.connect({
            ...options,
            addr: process.env.PORT,
            region: options.region || 'eu',
            onStatusChange: (status) => console.log(prefix, 'Status:', status),
            onLogEvent: (data) => console.log(prefix, data)
        });

        url.update(tunnel);

        // Removes "The 'X-Forwarded-For' header is set but
        // the Express 'trust proxy' setting is false (default)..."
        express.set('trust proxy', 1);

        events.on('url:update', (str) => {
            if (tunnel === str) return;
            def = str;
            url.update(tunnel);
        });

        return () => {
            url.update(def);
            express.set('trust proxy', trustProxy);
            ngrok.kill();
        };
    } catch (e) {
        url.update(def);
        express.set('trust proxy', trustProxy);
        console.error(prefix, 'Could not create a tunnel:', e);
    }
};