export default class useValidate {
  constructor(
    string,
    config = {
      length: 8,
    }
  ) {
    this.input = string;
    this.config = config;
  }

  isEmail() {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}cc");
    if (!regex.test(this.input)) throw new Error("not an Email");
    return this;
  }
  isEmpty() {
    if (!this.input.length) throw new Error("please fill in empty input");
    return this;
  }
  isNumber() {
    const regex = new RegExp(
      "^[+-]?(?=.d|d)(?:0|[1-9]d*)?(?:.d+)?(?:(?<=d)(?:[eE][+-]?d+))?$"
    );
    if (!regex.test(this.input)) throw new Error("this is not a number");
    return this;
  }
  isPhone() {
    const regex = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );
    if (!regex.test(this.input)) throw new Error("this is not a phone number");
    return this;
  }
  isEnoughLength() {
    if (this.input.length > this.config.length)
      throw new Error("this is too long");
    return this;
  }
  isNotSpecial() {
    const regex = new RegExp("[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]");
    if (regex.test(this.input))
      throw new Error("this input contains special character");
    return this;
  }
}
