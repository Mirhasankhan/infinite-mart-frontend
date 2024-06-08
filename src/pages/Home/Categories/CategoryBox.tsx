import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Category {
  name: string;
  subCategories?: string[];
}

interface CategoryBoxProps {
  c: Category;
}

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
    <div>
      <div onClick={handleClick} className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="text-white m-1">
          {c.name}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {c.subCategories?.map((sub, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleSubCategoryClick(sub);
              }}
              key={index}
            >
              <a>{sub}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryBox;
