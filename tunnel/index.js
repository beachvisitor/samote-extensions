const axios = require('axios');
const lt = require('localtunnel');

const options = {
    subdomain: 'your-subdomain'
};

module.exports = async ({ events, server, express, sockets, url }) => {
    let def = url.url;

    const publicIP = () => {
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                const { ip } = response?.data;
                sockets.host.emit('execute', `toast.info('Tunnel password: ${ip}', { duration: Infinity })`)
            })
            .catch(e => console.error('Could not get public IP', e));
    };

    try {
        // Waiting for the server to start to access process.env.PORT
        !server.listening && await new Promise(resolve => server.on('listening', resolve));
        const tunnel = await lt({ port: process.env.PORT, ...options });
        url.update(tunnel.url);
        publicIP();

        // Removes "The 'X-Forwarded-For' header is set but
        // the Express 'trust proxy' setting is false (default)..."
        express.set('trust proxy', 1);

        events.on('url:update', (str) => {
            if (tunnel.url === str) return;
            def = str;
            url.update(tunnel.url);
            publicIP();
        });

        tunnel.on('error', (e) => {
            url.update(def);
            console.error('An error occurred while tunneling', e);
        });

        return () => {
            express.set('trust proxy', 0);
            url.update(def);
            tunnel.close();
        };
    } catch (e) {
        url.update(def);
        console.error('Could not create tunnel:', e);
    }
};