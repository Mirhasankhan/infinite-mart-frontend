import FlashSale from "../flash-sale/FlashSale";
import BannerSlide from "./BannerSlide";
import Categories from "./Categories/Categories";
import NewArrivals from "./NewArrivals";
import TopBrands from "./TopBrands";
import TopSelling from "./TopSelling";
import WhyUs from "./WhyUs";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      <Categories />
      <BannerSlide />
      <WhyUs />
      <FlashSale />
      <TopBrands />
      <TopSelling />
      <NewArrivals />
    </div>
  );
};

export default Home;

