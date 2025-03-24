import { Toaster } from "react-hot-toast";
import RouterProvider from "./RouterProvider";
import AppRoutes from "../routes/AppRoutes";

const Providers = () => {
  return (
    <RouterProvider>
      <Toaster />
      <AppRoutes />
    </RouterProvider>
  );
};

export default Providers;
