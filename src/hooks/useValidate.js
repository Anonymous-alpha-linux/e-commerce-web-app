import { validateTypes } from "../fixtures";

export default class useValidate {
  constructor(
    string,
    config = {
      length: 8,
      passwordLength: 8,
    }
  ) {
    this.input = string;
    this.config = config;
  }

  isEmail(message = "Please input your email") {
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.input
      )
    )
      throw new Error(message);
    return this;
  }
  isEmpty(message = "Please fill in empty input") {
    if (!this.input.length) throw new Error(message);
    return this;
  }
  isNumber(message = "This is not a number") {
    const regex = new RegExp(
      "^(-?[1-9]+\\d*([.]\\d+)?)$|^(-?0[.]\\d*[1-9]+)$|^0$"
    );
    if (!regex.test(this.input)) throw new Error(message);
    return this;
  }
  isPhone(message = "This is not a phone number") {
    const regex = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );
    if (!regex.test(this.input)) throw new Error(message);
    return this;
  }
  isEnoughLength(message = "This is too short", options = { length: 10 }) {
    this.config = { ...this.config, ...this.options };
    if (!this.input) return this;
    if (this.input.length < this.config.length) throw new Error(message);
    return this;
  }
  isNotSpecial(message = "This input must contains special character") {
    const regex = new RegExp("[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]");
    if (regex.test(this.input)) throw new Error(message);
    return this;
  }
  isNotCode(message = "This input must contains code") {
    if (/<[a-z][\s\S]*>/.test(this.input)) throw new Error(message);
    return this;
  }
  isPassWord(
    message = "This input must contains 1 capital character, number and special character",
    options = { passwordLength: 8 }
  ) {
    this.config = { ...this.config, ...options };
    const regex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${this.config.passwordLength},}$`
    );
    if (!regex.test(this.input)) throw new Error(message);
    return this;
  }

  isAge(message = "Your date is not capable") {
    const now = new Date().getFullYear();
    const input = new Date(this.input).getFullYear();

    if (now - input < 18) {
      throw new Error(message);
    }
    return this;
  }
  isTooLong(message = "this is too long", length) {
    if (!this.input) return this;
    if (this.input.length > length) throw new Error(message);
    return this;
  }
}
