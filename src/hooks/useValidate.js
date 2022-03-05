class useValidate {

    constructor(string) {
        this.input = string;
    }

    isEmpty() {
        if (!this.input) throw new Error("Please fulfill your input !");
        return this;
    }
    isNumber() {
        if (!Number.isInteger(this.input)) throw new Error("This input must be number");
        return this;
    }
    isEmail() {

    }
    isLengthEnough() {

    }
    isPhone() {

    }
}


const validate = new useValidate('email@fpt.vn');
// chaining
try {
    // validate.isEmail().isNumber().isLengthEnough().input;
} catch (error) {
    console.log(error);
}