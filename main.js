import { Blockchain } from "./js/blockchain";
import { Block } from "./js/block";
import { Transaction } from "./js/transaction";
import { Wallet } from "./js/wallet";
import { NFT } from "./js/nft";
import { SHA256 } from "crypto-js";

const green = '\u001b[32m';

// ---- ・ハッシュ値の出力 ---- //
// ・入力した文字列の長さに関係なく、いつも同じ長さの文字列を出力することを示す
{
    console.log(green + "入力した文字列の長さに関係なく、いつも同じ長さの文字列を出力することを示す")
    const hash1 = SHA256("sample string");
    const hash2 = SHA256("another sample string");
    console.log("hash1: " + hash1.toString());
    console.log("hash2: " + hash2.toString());
}

// ・入力した値が似ていても、全く違う値が出力されることを示す
{
    console.log(green + "入力した値が似ていても、全く違う値が出力されることを示す");
    const hash1 = SHA256("お好み焼き");
    const hash2 = SHA256("お好みで");
    console.log("hash1: " + hash1.toString());
    console.log("hash2: " + hash2.toString());
}

// ・同じ値を入力したら、必ず同じ値を出力されることを示す
{
    console.log(green + "同じ値を入力したら、必ず同じ値を出力されることを示す");
    const hash1 = SHA256("sample string");
    const hash2 = SHA256("sample string");
    console.log("hash1: " + hash1.toString());
    console.log("hash2: " + hash2.toString());
    console.log("出力された値は同じか: ", hash1.toString() === hash2.toString());
}

// ・サイト閲覧者が任意の値を入力して遊べるようにする
{
    console.log(green + "サイト閲覧者が任意の値を入力して遊べるようにする");
    const option = "option";
    const hash = SHA256(option);
    console.log("hash: " + hash.toString());
}


// ---- ・ブロックチェーンの改ざんを検知するサンプル --- //
{
    console.log(green + "ブロックチェーンの改ざんを検知するサンプル");
    // ブロックチェーンを作成
    const blockchain = new Blockchain();
    // 二者間でのやり取りを想定して、二人分のウォレットを作成
    const wallet1 = new Wallet(blockchain);
    const wallet2 = new Wallet(blockchain);

    // トランザクションのために、マイニングで仮想通貨を入手する
    blockchain.minePendingTransactions(wallet1.publicKey);
    blockchain.minePendingTransactions(wallet2.publicKey);

    wallet1.createTransaction(wallet2.publicKey, 10, "こんにちは", {});
    wallet2.createTransaction(wallet1.public, 20, "初めまして", {});

    // 上記二つのトランザクションを検証・確定する
    blockchain.minePendingTransactions(wallet1.publicKey);

    // -- ここまで準備 -- //

    // ブロックチェーンが有効であることを確認する
    console.log("ブロックチェーンは有効か: ", blockchain.isChainValid());

    // これから改竄するトランザクションを確認する
    console.log("改ざん前のトランザクション: ", blockchain.chain[1].transactions[0]);

    // トランザクションを改竄する
    blockchain.chain[1].transactions[0].amount = 1000;

    // 改ざんされていることを確かめる
    console.log("改竄後のトランザクション", blockchain.chain[1].transactions[0]);

    // 改ざんされていることを検知する
    console.log("ブロックチェーンは有効か: ", blockchain.isChainValid());
}


// ---- ・ブロックチェーンのブロックは、どのようにして繋がっているのか の視覚化（hashとpreHashを使って）---- //
{
    console.log("ブロックチェーンのブロックは、どのようにして繋がっているのか の視覚化（hashとpreHashを使って）");
    const blockchain = new Blockchain();
    const address = "testAddress";
    blockchain.minePendingTransactions(address);
    blockchain.minePendingTransactions(address);
    blockchain.minePendingTransactions(address);
    blockchain.minePendingTransactions(address);

    for (let i = 0; i < blockchain.chain.length; i++) {
        if (i === 0) {
            const block = blockchain.chain[i];
            console.log(block.preHash);
        } else {
            const lastBlock = blockchain.chain[i - 1];
            const block = blockchain.chain[i];
            console.log("--------------------------------");
            console.log(green + `last block (chain[${i - 1}]) hash: `, lastBlock.hash);
            console.log(green + `current block (chain[${i}]) preHash: `, block.preHash);
            console.log("--------------------------------");
        }
    }
}