import React from 'react';
import ReactDOM from 'react-dom';
// Redux
// https://github.com/rt2zz/redux-persist
import { Provider } from 'react-redux';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import * as _redux from './setup';
import store from './setup/redux/Store';
// Axios

// Apps
import App from './app/App';
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 * */
import './_metronic/assets/sass/style.scss';
import './_metronic/assets/sass/style.react.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);

Chart.register(...registerables);

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      <App basename={PUBLIC_URL} />
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById('root')
);
