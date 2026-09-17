import { useNavigate } from "react-router-dom";
import { categories } from "../../../utils/categories";
import CategoryBox from "./CategoryBox";
import qs from "query-string";

const Categories = () => {
  const navigate = useNavigate();

  const handleMobileCategoryClick = (categoryName: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/products",
        query: {
          category: categoryName.replace(/\s/g, "/").replace(/'/g, ""),
        },
      },
      { skipNull: true }
    );
    navigate(url);
  };

  return (
    <div>
      {/* Desktop Navigation Bar */}
      <div className="hidden md:block bg-gradient-to-r from-primary via-[#955876] to-primary shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-1 lg:gap-3 py-1.5 justify-center items-center">
          {categories.map((c, index) => (
            <CategoryBox key={index} c={c} />
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Categories */}
      <div className="md:hidden overflow-x-auto py-2.5 px-3 bg-gray-50/80 border-b border-gray-200/60 scrollbar-none">
        <div className="flex items-center gap-2 w-max">
          {categories.map((c, index) => (
            <button
              key={index}
              onClick={() => handleMobileCategoryClick(c.name)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-medium shadow-2xs active:scale-95 transition-all whitespace-nowrap hover:border-primary hover:text-primary"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

