import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const SellerRoutes = ({ children }: { children: ReactNode }) => {
  const { email, role } = useAppSelector(useCurrentUser);
  if (!email || role == false) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return <div>{children}</div>;
};

export default SellerRoutes;
