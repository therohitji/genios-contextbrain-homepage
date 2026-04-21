import React from "react";
import ReactDOM from "react-dom/client";
import GeniOSLanding from "../GeniOS.jsx";
import DemoNavy from "./DemoNavy.jsx";
import DemoCharcoal from "./DemoCharcoal.jsx";
import DemoForest from "./DemoForest.jsx";
import DemoBlack from "./DemoBlack.jsx";
import DemoCopper from "./DemoCopper.jsx";
import DemoSkeleton from "./DemoSkeleton.jsx";
import DemoCopperFull from "./DemoCopperFull.jsx";

const demo = new URLSearchParams(window.location.search).get("demo");
const App =
  demo === "old" ? GeniOSLanding :
  demo === "full" ? DemoCopperFull :
  demo === "copper-preview" ? DemoCopper :
  demo === "preview" ? DemoBlack :
  demo === "charcoal" ? DemoCharcoal :
  demo === "forest" ? DemoForest :
  demo === "skeleton" ? DemoSkeleton :
  DemoNavy;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
