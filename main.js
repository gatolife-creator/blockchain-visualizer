import { Blockchain } from "./js/blockchain";
import { Block } from "./js/block";
import { Transaction } from "./js/transaction";
import { Wallet } from "./js/wallet";
import { NFT } from "./js/nft";

const blockchain = new Blockchain();
const wallet = new Wallet(blockchain);

console.log(blockchain);
console.log(wallet.publicKey);

blockchain.minePendingTransactions(wallet.publicKey);

console.log(wallet.getBalance());
console.log(blockchain.chain);