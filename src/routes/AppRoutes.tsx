import { Navigate, Route, Routes } from "react-router";
import WalletConnect from "../pages/wallet-connect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/wallet-connect" element={<WalletConnect />} />
      <Route path="/" element={<Navigate to="/wallet-connect" />} />
    </Routes>
  );
};

export default AppRoutes;
