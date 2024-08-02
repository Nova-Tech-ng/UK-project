import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}

export default App;
