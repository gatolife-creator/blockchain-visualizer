import { ec } from "elliptic";
import { NFT } from "./nft";
export declare class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    message: string;
    timestamp: number;
    signature: string;
    nft: NFT | undefined;
    constructor(fromAddress: string, toAddress: string, amount: number, message: string, nft?: NFT);
    /**
     * トランザクションのハッシュ値を算出する。
     * @returns
     */
    calculateHash(): string;
    /**
     * トランザクションに署名する。
     * @param signingKey
     */
    signTransaction(signingKey: ec.KeyPair): void;
    /**
     * トランザクションが有効かどうか調べる。
     * @returns
     */
    isValid(): boolean;
}
