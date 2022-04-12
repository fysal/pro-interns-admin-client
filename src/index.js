import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const globalStore = createStore(reducers, applyMiddleware(thunk));

const theme = createTheme({
  palette: {
    primary: { main: "#042F5C" },
  },
  // typography: {
  //   fontFamily : ["Poppins"].join(","),
  // }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
       <ThemeProvider theme={theme}><App /></ThemeProvider> 
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
