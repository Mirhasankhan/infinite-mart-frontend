import { Button } from "antd";
import Card from "../../components/ui/Card";
import CountdownTimer from "../../components/ui/CountDown";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const FlashSale = () => {
  const { data } = useProductsQuery("");
  const flashData = data?.data?.filter(
    (flash: { flashSale: true }) => flash.flashSale === true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const isFlashSalePage = location.pathname === "/flash-sale";

  const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className="px-3 md:px-14 my-8">
      <h1 className="font-medium text-xl md:text-2xl mb-4 pb-2 border-b">
        Flash Sale
      </h1>
      <div className="flex justify-between items-center pb-4">
        <div className="md:flex gap-24 items-center">
          <h1 className="text-red-400 pb-3">On Sale Now</h1>
          <div className="flex gap-2 items-center">
            Ending In : <CountdownTimer targetDate={targetDate} />
          </div>
        </div>
        {!isFlashSalePage && (
          <Link to="/flash-sale">
            <Button className="bg-green-400 text-white font-medium">
              See More
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {flashData
          ?.slice(0, isFlashSalePage ? flashData.length : 5)
          .map((data: TProduct) => (
            <Card key={data._id} product={data} />
          ))}
      </div>
    </div>
  );
};

export default FlashSale;
