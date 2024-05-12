import React from "react";

import Router from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
