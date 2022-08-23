import { Transaction } from './transaction';
export declare class Block {
    preHash: string;
    hash: string;
    timestamp: number;
    difficulty: number;
    transactions: Transaction[];
    nonce: number;
    constructor(preHash: string, transactions: Transaction[]);
    /**
     * ブロックのハッシュ値を算出する。
     * @returns
     */
    calculateHash(): string;
    /**
     * ブロックが有効かどうか調べる。
     */
    validateBlock(): void;
    /**
     * 有効なトランザクションを持っているかどうか調べる。
     * @returns
     */
    hasValidTransactions(): boolean;
}
