const verge = require("bitcoinjs-lib");

//Address generation
let vergeNetwork = verge.networks.verge;
let keyPair = verge.ECPair.makeRandom(vergeNetwork)
let publicKey = keyPair.publicKey;
let { address } = verge.payments.p2pkh({ pubkey: publicKey });
let pk = keyPair.toWIF();
console.log(address, pk);

function generateRawTx1(){
//Tx generation
let txb = new verge.TransactionBuilder(vergeNetwork);
let txid = "e048514a36ef56629a97b173503e1fe98518838834273c71c5a9a17e0ee3a397";
let outn = 1;

//Tx Input
txb.addInput(txid, outn);

//Tx Outputs
txb.addOutput("DESst6YZRXpY7cK8h4YF1P5D53uccgyr1C", 1);


let keyPairSpend = verge.ECPair.fromWIF("QT6t7Z5x6QJwx5QEBTnazE6w8NDZRaHXajG1c3Z2qGo9QsUi4cwy");
txb.sign(0, keyPairSpend);

let tx = txb.build();
let txhex = tx.toHex();
console.log(txhex);
}
function generateRawTx2(){
//Tx generation
let keyPairSpend = verge.ECPair.fromWIF("QT6t7Z5x6QJwx5QEBTnazE6w8NDZRaHXajG1c3Z2qGo9QsUi4cwy");
const psbt = new verge.Psbt()
psbt.addInput({

// if hash is string, txid, if hash is Buffer, is reversed compared to txid
       hash: 'e048514a36ef56629a97b173503e1fe98518838834273c71c5a9a17e0ee3a397',
       index: 1,
       sequence: 0xffffffff, // These are defaults. This line is not needed.

       // non-segwit inputs now require passing the whole previous tx as Buffer
       nonWitnessUtxo: Buffer.from(
         '0100000089dc395d014d63a9283530c4f82524c8f40da1393724a9a843f5b4c8eac' +
         'a36ef49a7bfd2d2000000006b483045022100a94d57ce9926014daabaa2bf5ae038' +
         '5def7e465a94648efaf2ff9a9908cdc7820220696bf6f666a83955005f26e059874' +
         'd489a0e4489e39d58af691f67890035269d0121035eef8aa40f15c05a29c622eaff' +
         'c74e6f8a5b7a933350bf09e1922ee5c2d9f37afdffffff02' +

/*       Example from btc tx(non-segwit)
         '0200000001f9f34e95b9d5c8abcd20fc5bd4a825d1517be62f0f775e5f36da944d9' +
         '452e550000000006b483045022100c86e9a111afc90f64b4904bd609e9eaed80d48' +
         'ca17c162b1aca0a788ac3526f002207bb79b60d4fc6526329bf18a77135dc566020' +
         '9e761da46e1c2f1152ec013215801210211755115eabf846720f5cb18f248666fec' +
         '631e5e1e66009ce3710ceea5b1ad13ffffffff01'
*/

           // value in satoshis (Int64LE) = 0x015f90 = 90000
           '80b92a0000000000' +
           //'40420f0000000000' +
           // scriptPubkey length
           '19' +
           // scriptPubkey
           '76a91456c2a96637e8990477cc1a0a417f97f28b01158488ac' +
           // locktime
           '00000000','hex', )
   })
   psbt.addOutput({
     address: 'DESst6YZRXpY7cK8h4YF1P5D53uccgyr1C',
     value: 0.1
   })
   var txhex= psbt.signInput(0, keyPairSpend)
   console.log(txhex);

   psbt.validateSignaturesOfInput(0)
}
generateRawTx2();
