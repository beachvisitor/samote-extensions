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
Everything works thanks to [localtunnel](https://theboroer.github.io/localtunnel-www).
It's a free service, so unfortunately there will mostly be long delays.
When you enter a tunneled website, you will be confronted with its authorization and you
will be asked for a password. The password is the public IP of the host (computer from which
the program is running). The extension should detect it itself and send a message with the
password to the host. In extreme case you can go to any website that defines the public IP
and copy it from there.

> [!NOTE]
> You can setup a static subdomain of the tunnel by going to the `index.js`
> file and changing the value of the `subdomain` key in the `options` object
> to the subdomain you want. Example: `subdomain: 'your-subdomain'`.
> The subdomain you choose may already be taken and you won't get it.

There may be problems with tunneling:
- Sometimes the tunnel may collapse and an error like `Error: connection refused:
  localtunnel.me:8385 (check your firewall settings)` appears in logs, restart the 
  program to restore functionality.
- Also, sometimes instead of the selected subdomain can be given the usual random ones,
  try to wait a bit and restart the program.