import { FaRegStar } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const features = [
  {
    icon: FaRegStar,
    title: "Top Ranked Sellers",
    description:
      "Curated exclusively by top-rated sellers, ensuring you always receive genuine, premium quality items.",
  },
  {
    icon: IoShieldCheckmark,
    title: "Organic & Verified",
    description:
      "Shop with complete confidence knowing our products undergo strict purity and sustainability vetting.",
  },
  {
    icon: CiDeliveryTruck,
    title: "Fast & Safe Delivery",
    description:
      "Enjoy prompt, trackable dispatch with careful handling directly to your doorstep on every order.",
  },
  {
    icon: IoCheckmarkDoneSharp,
    title: "100% Buyer Protection",
    description:
      "Rest easy with reliable customer support, guaranteed authentic items, and hassle-free returns.",
  },
];

const WhyUs = () => {
  return (
    <div className="px-3 md:px-14 2xl:px-60 my-8 md:my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="p-5 md:p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50/50 border border-gray-100 shadow-2xs hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                <Icon className="text-2xl md:text-3xl" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyUs;

