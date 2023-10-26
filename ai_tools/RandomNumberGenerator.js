import { Tool } from "langchain/tools";

export class RandomNumberGenerator extends Tool {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "random"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Useful for creating a random number between two input integers in the format min,max.`
        });
    }

    async call(input) {
        try {
            const numbers = input.split(",");
            if (numbers.length < 2) {
                throw "error";
            }
            const min = Math.ceil(parseInt(numbers[0]));
            const max = Math.floor(parseInt(numbers[1]));
            return Math.floor(Math.random() * (max - min + 1) + min).toString();
        }
        catch (error) {
            return "I don't know how to do that.";
        }
    }
}
