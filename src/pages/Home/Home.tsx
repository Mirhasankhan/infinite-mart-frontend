import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import FlashSale from "../flash-sale/FlashSale";
import BannerSlide from "./BannerSlide";
import Categories from "./Categories/Categories";

const Home = () => {
  const { email } = useAppSelector(useCurrentUser);
  console.log(email);
  return (
    <div>
      <Categories></Categories>
      <BannerSlide></BannerSlide>
      <FlashSale></FlashSale>
    </div>
  );
};

export default Home;
