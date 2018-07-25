import {Component} from '../lib/components'





export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      test: ' home '
    }
    

  }

  ComponentisMounted = () =>{
    console.log(document.getElementById('myimg'))
  }

  render() {
    this.ComponentisMounted()
    const text = 'take a photo'

    return (`
      <button id="testme">${text}</button>
      <img alt="myimg" id="myimg" />
      ${test(text)}
      </div>
  `)
  }

}



const test = (title) =>`<div>${title}</div>`



