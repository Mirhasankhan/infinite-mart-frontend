import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const WhyUs = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 md:px-14 2xl:px-60 my-6">
      <div className="flex flex-col items-center px-2">
        <FaRegStar className="md:text-5xl text-3xl text-primary"></FaRegStar>
        <h1 className="text-sm md:text-xl font-semibold py-3">
          Top Ranked Companies
        </h1>
        <p className="text-sm">
          Discover our exclusive collection curated by top-rated sellers,
          ensuring you receive only the best quality products.
        </p>
      </div>
      <div className="flex flex-col items-center px-2">
        <IoShieldCheckmark className="md:text-5xl text-3xl text-primary"></IoShieldCheckmark>
        <h1 className="text-sm md:text-xl font-semibold py-3">
          Organic Certificated
        </h1>
        <p className="text-sm">
          Shop with peace of mind knowing our products are Organic Certified,
          guaranteeing they meet the highest standards for purity and
          sustainability.
        </p>
      </div>
      <div className="flex flex-col items-center px-2 ">
        <CiDeliveryTruck className="md:text-5xl text-3xl text-primary"></CiDeliveryTruck>
        <h1 className="text-sm md:text-xl font-semibold py-3">Fast Delivery</h1>
        <p className="text-sm">
          Experience the convenience of our fast delivery service, ensuring your
          purchases arrive swiftly and on time.
        </p>
      </div>
      <div className="flex flex-col items-center px-2">
        <IoCheckmarkDoneSharp className="md:text-5xl text-3xl text-primary"></IoCheckmarkDoneSharp>
        <h1 className="text-sm md:text-xl font-semibold py-3">
          Trusted Products
        </h1>
        <p className="text-sm">
          Rest assured with our trusted products, carefully vetted for quality
          and reliability.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
