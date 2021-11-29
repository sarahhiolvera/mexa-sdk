const { config } = require("./config");

function toJSONRPCPayload(engine, method, params) {
    if (!method) {
        throw new Error('JSONRPC method should be specified for params: "'+ JSON.stringify(params) +'"!');
    }

    if(!engine.jsonRPC || engine.jsonRPC.messageId == undefined) {
        throw new Error("engine object should have jsonRPC key with field 'messageId'");
    }

    // advance message ID
    engine.jsonRPC.messageId++;

    return {
        jsonrpc: '2.0',
        id: engine.jsonRPC.messageId,
        method: method,
        params: params || []
    };
};

const isTrustedForwarderV2Supported = (networkId) => {
    return config.trustedForwarderV2SupportedNetworks.indexOf(parseInt(networkId)) >= 0;
  }

module.exports = {toJSONRPCPayload, isTrustedForwarderV2Supported}