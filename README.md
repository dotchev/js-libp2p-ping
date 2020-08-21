# js-libp2p-ping

Ping example using [js-libp2p](https://github.com/libp2p/js-libp2p)

Based on https://docs.libp2p.io/tutorials/getting-started/javascript/ with some improvements. ;)

## Running

```sh
npm install
```

```sh
node main.js
```
Copy the address from the output.

In a separate console
```sh
node main.js <address>
```
The second node will ping the first one and print the latency.

**Hint:** you can run it also against [go-libp2p-ping](https://github.com/dotchev/go-libp2p-ping)