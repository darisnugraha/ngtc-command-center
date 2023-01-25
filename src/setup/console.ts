/* eslint-disable no-console */
export default class Console {
  static log(message: string) {
    console.log(message);
  }

  static error(message: string) {
    console.error(message);
  }

  static warn(message: string) {
    console.warn(message);
  }

  static table(message: string) {
    console.table(message);
  }
}
