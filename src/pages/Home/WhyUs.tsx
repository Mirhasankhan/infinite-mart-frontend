import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const WhyUs = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 md:px-14 my-6">
      <div className="flex flex-col items-center px-2">
        <FaRegStar className="md:text-5xl text-3xl text-green-400"></FaRegStar>
        <h1 className="md:text-xl font-semibold py-3">Top Ranked Companies</h1>
        <p>
          Discover our exclusive collection curated by top-rated sellers,
          ensuring you receive only the best quality products.
        </p>
      </div>
      <div className="flex flex-col items-center px-2">
        <IoShieldCheckmark className="md:text-5xl text-3xl text-green-400"></IoShieldCheckmark>
        <h1 className="md:text-xl font-semibold py-3">Organic Certificated</h1>
        <p>
          Shop with peace of mind knowing our products are Organic Certified,
          guaranteeing they meet the highest standards for purity and
          sustainability.
        </p>
      </div>
      <div className="flex flex-col items-center px-2 ">
        <CiDeliveryTruck className="md:text-5xl text-3xl text-green-400"></CiDeliveryTruck>
        <h1 className="md:text-xl font-semibold py-3">Fast Delivery</h1>
        <p>
          Experience the convenience of our fast delivery service, ensuring your
          purchases arrive swiftly and on time.
        </p>
      </div>
      <div className="flex flex-col items-center px-2">
        <IoCheckmarkDoneSharp className="md:text-5xl text-3xl text-green-400"></IoCheckmarkDoneSharp>
        <h1 className="md:text-xl font-semibold py-3">Trusted Products</h1>
        <p>
          Rest assured with our trusted products, carefully vetted for quality
          and reliability.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
