import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import { store } from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
