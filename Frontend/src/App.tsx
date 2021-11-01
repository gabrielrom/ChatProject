import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import AppProvider from './hooks';

var App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
