import { Transaction } from "./transaction";
import { Block } from "./block";
export declare class Blockchain {
    chain: Block[];
    pendingTransactions: Transaction[];
    constructor();
    /**
     * ブロックチェーンの最初のブロックを生成。
     * @returns
     */
    static createGenesisBlock(): Block;
    /**
     * 最新のブロックの直前のブロックを取得。
     * @returns
     */
    getLatestBlock(): Block;
    /**
     * ブロックチェーンにトランザクションを追加（マイニング待ち）。
     * @param transaction
     */
    addTransaction(transaction: Transaction): void;
    /**
     * マイニング待ちのトランザクションをマイニングする。
     * @param miningRewardAddress
     */
    minePendingTransactions(miningRewardAddress: string): void;
    /**
     * 指定したアドレスの仮想通貨保持量を調べる。
     * @param address
     * @returns
     */
    getBalanceOfAddress(address: string): number;
    /**
     * 指定したアドレスの今までのトランザククションを調べる。
     * @param address
     * @returns
     */
    getTransactionsOfAddress(address: string): Transaction[];
    /**
     * 二つのアドレス間でやりとりされたトランザクションを調べる。
     * @param address1
     * @param address2
     * @returns
     */
    getTransactionsBetweenTwo(address1: string, address2: string): Transaction[];
    /**
     * ブロックチェーンが有効かどうか調べる。
     * @returns
     */
    isChainValid(): boolean;
    /**
     * JSONデータ形式のブロックチェーンを元に戻す。
     * @param json
     * @returns
     */
    static jsonToBlockchain(json: string): Blockchain;
    /**
     * チェーンを置き換える。
     * @param chain
     * @returns
     */
    replaceChain(chain: Block[]): void | boolean;
    /**
     * 自己破壊する（非推奨）。
     */
    selfDestruct(): void;
}
