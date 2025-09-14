import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { initializeJobs } from "./services/db/jobsDb";
import { initializeCandidates } from "./services/db/candidatesDb";
import { initializeAssessments } from "./services/db/assessmentsDb";
import { initializeApplications } from "./services/db/applicationsDb";

const startApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

if (process.env.NODE_ENV === "development") {
  // console.log("Starting MSW in development mode");
  import("./services/mocks/browser")
    .then(({ worker }) => {
      // console.log("MSW module loaded, starting worker");
      worker
        .start({
          onUnhandledRequest: "warn",
        })
        .then(() => {
          // console.log("MSW started successfully");
          // Initialize databases after MSW is ready
          initializeJobs();
          initializeCandidates();
          initializeAssessments();
          initializeApplications();
          // Start the app after MSW is ready
          startApp();
        })
        .catch((error) => console.error("MSW failed to start:", error));
    })
    .catch((error) => console.error("Failed to import MSW:", error));
} else {
  // In production, initialize databases immediately and start app
  initializeJobs();
  initializeCandidates();
  initializeAssessments();
  initializeApplications();
  startApp();
}
