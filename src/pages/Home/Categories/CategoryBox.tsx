import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import {
  IoShirtOutline,
  IoLaptopOutline,
  IoRestaurantOutline,
  IoBookOutline,
  IoSparklesOutline,
  IoFootstepsOutline,
  IoWatchOutline,
  IoCallOutline,
  IoGridOutline,
} from "react-icons/io5";

interface Category {
  name: string;
  subCategories?: string[];
}

interface CategoryBoxProps {
  c: Category;
}

const getCategoryIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "fashion":
      return <IoShirtOutline className="text-base" />;
    case "electronics":
      return <IoLaptopOutline className="text-base" />;
    case "kitchen":
      return <IoRestaurantOutline className="text-base" />;
    case "books":
      return <IoBookOutline className="text-base" />;
    case "beauty":
      return <IoSparklesOutline className="text-base" />;
    case "shoes":
      return <IoFootstepsOutline className="text-base" />;
    case "watches":
      return <IoWatchOutline className="text-base" />;
    case "telecommunications":
      return <IoCallOutline className="text-base" />;
    default:
      return <IoGridOutline className="text-base" />;
  }
};

const CategoryBox = ({ c }: CategoryBoxProps) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      category: c.name.replace(/\s/g, "/").replace(/'/g, ""),
    };

    const url = qs.stringifyUrl(
      {
        url: "/products",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    navigate(url);
  };

  const handleSubCategoryClick = (sub: string) => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      category: `${c.name.replace(/\s/g, "/").replace(/'/g, "")}/${sub.replace(
        /\s/g,
        "F"
      )}`,
    };

    const url = qs.stringifyUrl(
      {
        url: "/products",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    navigate(url);
  };

  return (
    <div className="dropdown dropdown-hover group">
      <button
        type="button"
        tabIndex={0}
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/95 hover:text-white hover:bg-white/15 active:scale-95 transition-all text-xs lg:text-sm font-medium focus:outline-none"
      >
        <span className="opacity-80 group-hover:opacity-100 transition-opacity">
          {getCategoryIcon(c.name)}
        </span>
        <span>{c.name}</span>
        {c.subCategories && c.subCategories.length > 0 && (
          <IoChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180 opacity-70" />
        )}
      </button>

      {c.subCategories && c.subCategories.length > 0 && (
        <ul
          tabIndex={0}
          className="dropdown-content z-30 menu p-1.5 mt-1 shadow-xl bg-white/95 backdrop-blur-md rounded-xl border border-gray-100 w-52 text-gray-700 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {c.subCategories.map((sub, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSubCategoryClick(sub);
              }}
            >
              <a className="rounded-lg py-2 px-3 hover:bg-primary/10 hover:text-primary text-xs lg:text-sm font-medium capitalize transition-colors">
                {sub}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryBox;

