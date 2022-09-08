import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import HeaderBar from "./layouts/header";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <HeaderBar />
      </div>
    </Provider>
  );
}

export default App;
