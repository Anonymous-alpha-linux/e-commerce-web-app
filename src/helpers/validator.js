export default class Validator {
    constructor(value) {
        this.value = value;
    }
    isRequired() {
        if (!this.value || this.value === null || this.value === undefined) throw new Error("Please fulfill your input!");
        return this;
    }
    isEnoughLength(length) {
        if (this.value < length) throw new Error(`Your input must be ${length} at least`);
        return this;
    }
    isEmail() {
        const emailRegex = /[a-z][0-9]/i;
        if (!emailRegex.test(this.value)) throw new Error(`Your email isn't correct`);
        return this;
    }
    isPhone() {
        const phoneRegex = /[0-9]/i;
        if (!phoneRegex.test(this.value)) throw new Error(`Your phone isn't correct`);
        return this;
    }
}