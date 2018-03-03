import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#282c34',
      paper: '#21252b',
    },
    primary: {
      light: '#fff3a5',
      main: '#f4c075',
      dark: '#bf9047',
      contrastText: '#000',
    },
    secondary: {
      light: '#caf692',
      main: '#98c363',
      dark: '#689235',
      contrastText: '#000',
    },
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>

  <HashRouter>
    <App />
  </HashRouter>
</MuiThemeProvider>
    ,
  document.getElementById('root')
);
registerServiceWorker();
