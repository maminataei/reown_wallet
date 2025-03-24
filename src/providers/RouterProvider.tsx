import { BrowserRouter } from "react-router";

const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
