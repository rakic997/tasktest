import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style/index.scss';

import { GroupsContextProvider } from './context/GroupsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GroupsContextProvider>
      <App />
    </GroupsContextProvider>
  </React.StrictMode>,
)
