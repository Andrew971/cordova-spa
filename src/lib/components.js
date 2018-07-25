
export class Component {
// constructor(){
// this.render()
// }

  static staticMethod() {
    return console.log('static method has been called.');
  }
}

Component.prototype.props = {
  stm: 'test',
  smt2: 'test2'
}

