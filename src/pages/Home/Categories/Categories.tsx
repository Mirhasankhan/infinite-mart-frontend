import { categories } from "../../../utils/categories";
import CategoryBox from "./CategoryBox";

const Categories = () => {
  return (
    <div>
      <div className="flex gap-8 bg-orange-400 justify-center mt-4">
        {categories.map((c, index) => (
          <CategoryBox key={index} c={c}></CategoryBox>
        ))}
      </div>
    </div>
  );
};

export default Categories;
