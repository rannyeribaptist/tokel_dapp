// const got = require('got');

export const getnewaddress = () => {
  // returns test data at the moment not to create too many wallets
  return {
    address: 'RJfjdEYQPzbKtENYqRsJF6qpkhVrwGwZxU',
    compressed: 1,
    pubkey:
      '0376094fff1d654f441f82b2a73e1a5769fd67ca9c95bfd03d381e05491aca814d',
    seed:
      '1484 1333 615 1854 1035 383 766 506 782 124 317 2040 788 405 1132 2014 1727 258 393 17 748 1111 1920',
    wif: 'Uq6Hy34eqi3W35q8qY8BGqTp8Lr2WWAjcFftJ2YfvBh5UseskYUM',
    wifprefix: 188,
  };
  /**
  return (async () => {
    const {body} = await got.post('http://127.0.0.1:7771', {
      json: {
        jsonrpc: '2.0',
        id: "curltest",
        method: "getnewaddress",
        params: []
      },
      responseType: 'json'
    });
    return body;
  })();
*/
};

export const hello = () => 'hello';
