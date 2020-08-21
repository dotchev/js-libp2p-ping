const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require('libp2p-secio')
const MPLEX = require('libp2p-mplex')

const multiaddr = require('multiaddr')

async function main() {
  const node = await Libp2p.create({
    addresses: {
      // add a listen address (localhost) to accept TCP connections on a random port
      listen: ['/ip4/127.0.0.1/tcp/0']
    },
    modules: {
      transport: [TCP],
      connEncryption: [SECIO],
      streamMuxer: [MPLEX]
    }
  })

  // start libp2p
  await node.start()
  console.log('libp2p has started')

  // print out listening addresses
  console.log('listening on addresses:')
  node.multiaddrs.forEach(addr => {
    console.log(`${addr}/p2p/${node.peerId.toB58String()}`)
  })

  // ping peer if received multiaddr
  if (process.argv.length >= 3) {
    const peer = process.argv[2]
    console.log(`pinging remote peer at ${peer}`)
    setInterval(async () => {
      const latency = await node.ping(multiaddr(peer))
      console.log(`pinged in ${latency}ms`)
    }, 2000)
  } else {
    console.log('no remote peer address given, skipping ping')
  }

  async function stop() {
    console.log('Stopping...');
    // stop libp2p
    await node.stop()
    console.log('libp2p has stopped')
    process.exit(0)
  }

  process.on('SIGTERM', stop)
  process.on('SIGINT', stop)
}

main()
