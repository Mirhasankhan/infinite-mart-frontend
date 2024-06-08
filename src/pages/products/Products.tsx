import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TProduct } from "../../types/product.type";
import Card from "../../components/ui/Card";

const Products = () => {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product/allProducts")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const [mainCategory, subCategory] = category.split("/");

          const filtered = data?.data?.filter(
            (p: { category: string; subCategory: string }) => {
              return (
                p.category === mainCategory &&
                (!subCategory || p.subCategory === subCategory)
              );
            }
          );

          setProducts(filtered);
        } else {
          setProducts(data.data);
        }
      });
  }, [category]);

  return (
    <div className="my-8 px-6 md:px-14 grid grid-cols-5 gap-3">
      <div className="bg-gray-400">filters</div>
      <div className="grid grid-cols-4 gap-6 col-span-4">
        {products.map((product: TProduct) => (
          <Card key={product._id} product={product}></Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
