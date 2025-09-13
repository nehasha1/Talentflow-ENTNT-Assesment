import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { initializeJobs } from "./services/db/jobsDb";
import { initializeCandidates } from "./services/db/candidatesDb";
import { initializeAssessments } from "./services/db/assessmentsDb";

if (process.env.NODE_ENV === "development") {
  import("./services/mocks/browser").then(({ worker }) => {
    worker
      .start({
        onUnhandledRequest: "warn",
      })
      .then(() => {
        console.log("MSW started");
      });
  });
}

initializeJobs();
initializeCandidates();
initializeAssessments();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
