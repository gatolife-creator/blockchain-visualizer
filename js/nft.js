import { SHA1, SHA256 } from "crypto-js";
var NFT = /** @class */ (function () {
    function NFT(title, creator, description, content, price, movable) {
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.timestamp = Date.now();
        this.content = content;
        this.price = price;
        this.movable = movable;
        this.id = SHA1(String(this.timestamp + Math.random())).toString();
    }
    NFT.prototype.calculateHash = function () {
        return SHA256(this.title +
            this.creator +
            this.description +
            this.timestamp +
            this.content +
            this.price +
            this.movable +
            this.id).toString();
    };
    return NFT;
}());
export { NFT };
var Card = /** @class */ (function () {
    function Card(question, answer, hint) {
        if (hint === void 0) { hint = ""; }
        this.question = question;
        this.answer = answer;
        this.hint = hint;
    }
    return Card;
}());
export { Card };
