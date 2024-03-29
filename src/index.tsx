import { createRoot } from 'react-dom/client';
import App from './App';
import { setRedirect } from "./redirect";
import * as serviceWorker from './serviceWorker';

import { setupIonicReact } from '@ionic/react';
import "./services/i18next"

// force ios, which our styling requires
setupIonicReact({
  rippleEffect: false,
  mode: 'ios'
});

// when the app first loads, check if we have been redirected from a 404.html
// and the Home view will try to redirect to that (if it's valid), when it first
// renders.
const params = new URLSearchParams(window.location.search);
const path = params.get('404') || '';
if (path.length) {
  setRedirect(path);
}

let app: any = null;
// @ts-ignore
createRoot(document.getElementById('root')).render(<App ref={x => { app = x; }} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate (registration) {
    // new data is available
    if (app) {
      app.setState( {updatesAvailable: true} );
    }
  }
});
