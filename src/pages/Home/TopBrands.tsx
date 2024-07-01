import brand1 from "../../assets/images/brand1.png";
import brand2 from "../../assets/images/brand2.png";
import brand3 from "../../assets/images/brand3.png";
import brand4 from "../../assets/images/brand4.png";
import brand5 from "../../assets/images/brand5.png";
import brand6 from "../../assets/images/brand6.png";

const TopBrands = () => {
  return (
    <div className="px-3 md:px-14 ">
      <div className="grid grid-cols-5 md:grid-cols-6 gap-3 border-y py-8">
        <img src={brand1} alt="" />
        <img src={brand2} alt="" />
        <img src={brand3} alt="" />
        <img src={brand4} alt="" />
        <img className="hidden md:block" src={brand5} alt="" />
        <img src={brand6} alt="" />
      </div>
    </div>
  );
};

export default TopBrands;
