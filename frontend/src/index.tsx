import ReactDOM from 'react-dom/client';
import App from '@/App';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Tailwind
import './tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
