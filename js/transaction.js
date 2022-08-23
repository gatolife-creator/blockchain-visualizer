import { SHA256 } from "crypto-js";
import { ec } from "elliptic";
var secp256k1 = new ec("secp256k1");
var Transaction = /** @class */ (function () {
    function Transaction(fromAddress, toAddress, amount, message, nft) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.message = message;
        this.timestamp = Date.now();
        this.signature = "";
        this.nft = nft;
    }
    /**
     * トランザクションのハッシュ値を算出する。
     * @returns
     */
    Transaction.prototype.calculateHash = function () {
        return SHA256(this.fromAddress +
            this.toAddress +
            this.amount +
            this.message +
            this.timestamp +
            this.nft).toString();
    };
    /**
     * トランザクションに署名する。
     * @param signingKey
     */
    Transaction.prototype.signTransaction = function (signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }
        var hashTx = this.calculateHash();
        var sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    };
    /**
     * トランザクションが有効かどうか調べる。
     * @returns
     */
    Transaction.prototype.isValid = function () {
        if (this.fromAddress === "System")
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }
        var publicKey = secp256k1.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    };
    return Transaction;
}());
export { Transaction };
