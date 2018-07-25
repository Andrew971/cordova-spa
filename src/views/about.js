import {Component} from '../lib/components'





export default class About extends Component {
  constructor() {
    super()

    this.state = {
      test: ' About '
    }
  }

  isMounted = () => {
    
    console.log('ok')
    document
      .getElementById('testme')
      .addEventListener('touchend', this.onTouch.bind(this), false);
        
  }

  onTouch = ()=> {
    const {Camera, CameraPopoverOptions} = window ;

    let cameraOptions = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
    };

    const cameraSuccess = (imageData) => {
      const image = document.getElementById('myimg');
      image.setAttribute('src', imageData)
    };
    
    const cameraError = () => {
      console.log('error camerra')

    };

    navigator
      .camera
      .getPicture(cameraSuccess, cameraError, cameraOptions);

  }

  render() {
    var xFoo = document.createElement('x-Foo');
    xFoo.innerHTML = 'test';
    
    console.log(xFoo)
    const text = 'take a photo'

    return (`
      <div class="app">
      <h1>Apache Cordova</h1>
      <a href="%PUBLIC_URL%/">home</a>
      <a href="%PUBLIC_URL%/other.html">other</a>
      <br />
      <button id="testme">${text}</button>
      <img alt="myimg" id="myimg" />
      ${test(text)}
      </div>
  `)
  }

}



const test = (title) =>`<div>${title}</div>`



