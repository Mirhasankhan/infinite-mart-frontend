import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const WhyUs = () => {
  return (
    <div className="grid grid-cols-4 gap-3 px-6 md:px-14 my-24">
      <div className="flex flex-col items-center px-2">
        <FaRegStar className="text-5xl text-green-400"></FaRegStar>
        <h1 className="text-xl font-semibold py-3">Top Ranked Companies</h1>
        <p>
          Discover our exclusive collection curated by top-rated sellers,
          ensuring you receive only the best quality products.
        </p>
      </div>
      <div className="flex flex-col items-center px-2 border-x-2">
        <IoShieldCheckmark className="text-5xl text-green-400"></IoShieldCheckmark>
        <h1 className="text-xl font-semibold py-3">Organic Certificated</h1>
        <p>
          Shop with peace of mind knowing our products are Organic Certified,
          guaranteeing they meet the highest standards for purity and
          sustainability.
        </p>
      </div>
      <div className="flex flex-col items-center px-2 border-r-2">
        <CiDeliveryTruck className="text-5xl text-green-400"></CiDeliveryTruck>
        <h1 className="text-xl font-semibold py-3">Fast Delivery</h1>
        <p>
          Experience the convenience of our fast delivery service, ensuring your
          purchases arrive swiftly and on time.
        </p>
      </div>
      <div className="flex flex-col items-center px-2">
        <IoCheckmarkDoneSharp className="text-5xl text-green-400"></IoCheckmarkDoneSharp>
        <h1 className="text-xl font-semibold py-3">Trusted Products</h1>
        <p>
          Rest assured with our trusted products, carefully vetted for quality
          and reliability. Each item in our store is backed by a commitment to
          excellence and customer satisfaction
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
