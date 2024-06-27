import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useCartsQuery } from "../../redux/features/cart/cartManagement.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import Lottie from "lottie-react";
import spinner from "../../assets/loading.json";

const MainLayout = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { isLoading } = useCartsQuery(email);
  return isLoading ? (
    <div className="flex justify-center items-center">
      <Lottie
        style={{ height: "400px", width: "600px" }}
        animationData={spinner}
        loop={true}
      />
    </div>
  ) : (
    <div>
      <Header></Header>
      <div className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
