const ProviderEngine = require("web3-provider-engine");
const RpcSubprovider = require("web3-provider-engine/subproviders/rpc.js");
const WebSocketSubProvider = require("web3-provider-engine/subproviders/websocket.js");

module.exports = BurnerProvider;

function BurnerProvider(opts = {}) {
  let engine = new ProviderEngine();

  if (
    opts &&
    opts.rpcUrl &&
    opts.rpcUrl.indexOf &&
    opts.rpcUrl.indexOf("wss://") == 0
  ) {
    engine.addProvider(new WebSocketSubProvider(opts));
  } else {
    // data source
    engine.addProvider(new RpcSubprovider(opts));
  }

  // start polling for blocks
  engine.start();

  //do this to prevent skipCache: true -- to prevent PollingBlockTracker undefined errors from eth-block-tracker/src/polling.js
  //engine._blockTracker._setSkipCacheFlag = false

  return engine;
}
