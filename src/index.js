import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import "style/reset.css"
import "style/common.css"
import "style/auth.css"
import "style/profile.css"
import "style/tweet.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
