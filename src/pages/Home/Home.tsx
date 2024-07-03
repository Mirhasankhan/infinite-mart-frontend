import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import FlashSale from "../flash-sale/FlashSale";
import BannerSlide from "./BannerSlide";
import Categories from "./Categories/Categories";
import NewArrivals from "./NewArrivals";
import TopBrands from "./TopBrands";
import TopSelling from "./TopSelling";
import WhyUs from "./WhyUs";

const Home = () => {
  const { email } = useAppSelector(useCurrentUser);
  console.log(email);
  return (
    <div>
      <Categories></Categories>
      <BannerSlide></BannerSlide>
      <WhyUs></WhyUs>
      <FlashSale></FlashSale>
      <TopBrands></TopBrands>
      <TopSelling></TopSelling>
      <NewArrivals></NewArrivals>
    </div>
  );
};

export default Home;
