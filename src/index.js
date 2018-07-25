import Init from './lib/init';
import App from './App';
import './index.css';



const startApp = () => {

  Init.render(App, document.getElementById('root'))

};


if(window.cordova) {
  console.log('cordova')
  document.addEventListener('deviceready', startApp, false);
} else {
  console.log('no cordova')
  startApp();
}


