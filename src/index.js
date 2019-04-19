import React from "react";
import ReactDOM from "react-dom";
import TaxForm from "./components/TaxForm";
require('file-loader?name=[name].[ext]!../public/index.html');

ReactDOM.render(
    <TaxForm />,
  document.getElementById("react")
);
