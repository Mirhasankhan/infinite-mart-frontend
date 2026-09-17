import brand1 from "../../assets/images/brand1.png";
import brand2 from "../../assets/images/brand2.png";
import brand3 from "../../assets/images/brand3.png";
import brand4 from "../../assets/images/brand4.png";
import brand5 from "../../assets/images/brand5.png";
import brand6 from "../../assets/images/brand6.png";

const brands = [
  { img: brand1, name: "Brand 1" },
  { img: brand2, name: "Brand 2" },
  { img: brand3, name: "Brand 3" },
  { img: brand4, name: "Brand 4" },
  { img: brand5, name: "Brand 5" },
  { img: brand6, name: "Brand 6" },
];

const TopBrands = () => {
  return (
    <div className="px-3 md:px-14 2xl:px-60 my-10 md:my-14">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-2">
          Official Partners
        </span>
        <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Featured Global Brands
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1.5">
          Shop authentic merchandise directly from top world-class labels & trusted manufacturers
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="h-24 sm:h-28 rounded-2xl bg-white border border-gray-100/90 shadow-2xs hover:shadow-md hover:border-primary/30 flex items-center justify-center p-4 transition-all duration-300 group cursor-pointer"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-12 w-auto max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 opacity-75 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;

