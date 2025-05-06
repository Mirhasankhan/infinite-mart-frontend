import { categories } from "../../../utils/categories";
import CategoryBox from "./CategoryBox";

const Categories = () => {
  return (
    <div>
      <div className="hidden md:flex gap-8 py-2 bg-primary justify-center mt-4">
        {categories.map((c, index) => (
          <CategoryBox key={index} c={c}></CategoryBox>
        ))}
      </div>
    </div>
  );
};

export default Categories;
