



const Init = {

render (Template, node) {
  const Component = new Template();
  Component.constructor();
  node.innerHTML = Component.render()
  Component.ComponentisMounted();


},

}

export default Init