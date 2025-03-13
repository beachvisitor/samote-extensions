# Samote Extensions
**A repository for storing extensions for the [Samote](https://github.com/beachvisitor/samote).**

## Installation

1. Go to [releases](https://github.com/beachvisitor/samote-extensions/releases);
2. Find the extension you are interested in;
3. Download and extract its archive;
4. Now you have a folder with the extension in which the `package.json` file should be located;
5. Follow [these](https://github.com/beachvisitor/samote/tree/main?tab=readme-ov-file#installation-1)
   instructions to connect the extension to the program.

## Tunnel

Creates a tunnel for the website, making it accessible anywhere in the world.
Everything works thanks to [ngrok](https://ngrok.com).
This service provides a free but unfortunately very limited subscription,
this is **the only option** available to everyone. The maximum amount of data sent
is 1GB, which is enough for ~150 minutes of streaming, after that all I can
suggest is to register a new account and do the same with it.
Follow this steps to set up extensions:
1. Go to the dashboard by authorizing the service;
2. Take your token from the [Your Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) section;
3. Open `index.js` and find the `options` variable;
4. Set the value of the `authtoken` key to your token.
5. Done!

```javascript
const options = {
    authtoken: 'a1b2c3d4e5f6',
    hostname: 'domain.ngrok-free.app'
};
```

> [!NOTE]
> You can set a custom static [domain](https://dashboard.ngrok.com/domains) for the tunnel by
> settings `hostname` to your domain similar to `authtoken`.

## Starter

Starts the stream, if not already running, when the user is authorized.

## Hider

Hides all users for the host.