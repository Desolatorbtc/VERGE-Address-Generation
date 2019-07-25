var verge = require("bitcoinjs-lib");

var tryNumber = 0;
var randomNumber = 0

function getAddress(wish1, wish2){

  while (randomNumber<1) {
    var keyPair = verge.ECPair.makeRandom();
    var publicKey = keyPair.publicKey;
    var { address } = verge.payments.p2pkh({ pubkey: publicKey });
    var wishList = address.substring(0,4)
    console.log(tryNumber + " " + wishList)
    if (wishList == wish1 || wishList == wish2) {
    console.log("the private key is: " + keyPair.toWIF());
    console.log("the public key is: " + address );
    randomNumber=2
    };
    tryNumber++;
  };
};

getAddress("DWEN" , "DESO");
