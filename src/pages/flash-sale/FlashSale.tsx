import Card from "../../components/ui/Card";
import CountdownTimer from "../../components/ui/CountDown";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { FaBolt } from "react-icons/fa6";

const FlashSale = () => {
  const { data, isLoading } = useProductsQuery("");
  const flashData = data?.data?.filter(
    (flash: { flashSale: boolean }) => flash.flashSale === true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const isFlashSalePage = location.pathname === "/flash-sale";

  const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className="px-3 md:px-14 2xl:px-60 my-10 md:my-14">
      {/* Header Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-amber-50/40 border border-rose-100/70 mb-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm shadow-rose-200">
                <FaBolt className="text-lg" />
              </span>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                  Flash Sale
                </h2>
                <p className="text-xs text-rose-600 font-semibold tracking-wide uppercase">
                  Limited Quantities Available
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-[1px] bg-rose-200" />

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-gray-600">
                Ends In:
              </span>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>

          {!isFlashSalePage && (
            <div className="self-end md:self-auto">
              <Link to="/flash-sale">
                <Button buttonName="See All Deals" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Products */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-80 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : flashData && flashData.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flashData
            ?.slice(0, isFlashSalePage ? flashData.length : 4)
            .map((item: TProduct) => (
              <Card key={item._id} product={item} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-sm">
            No active flash sales right now. Check back soon for hot discounts!
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashSale;

