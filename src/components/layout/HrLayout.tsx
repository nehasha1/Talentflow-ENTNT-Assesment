import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../HrDashboard/Header";

const HrLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HrLayout;
