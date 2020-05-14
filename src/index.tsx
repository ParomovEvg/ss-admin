import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/createStore';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Navigation } from './components/navigation/Navigation.fipc';
import 'react-notifications/dist/react-notifications.css';
export const colors = {
  dark: '#001941',
  secondary: '#f6b90a',
  black: '#000',
  bg: '#f5f5f5',
  white: '#fff',
  textMain: '#3b3b3b',
  textSecond: '#9c9c9c',
  link: '#4987ff',
} as const;
const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.dark,
    },
    secondary: {
      main: colors.secondary,
    },
    info: {
      main: colors.link,
    },
    text: {
      primary: colors.textMain,
    },
    background: {
      default: colors.bg,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
