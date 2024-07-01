import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TProduct } from "../../types/product.type";
import Card from "../../components/ui/Card";

const Products = () => {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://infinite-mart-server.vercel.app/api/v1/product/allProducts")
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
    <div className="my-8 px-3 md:px-14">
      <div>
        <Link to="/">Home</Link>
        <Link to={`/products?category=${category}`}>{category}</Link>
      </div>
      <div className="mt-6">
        {products?.length > 0 ? (
          <div className="grid grid-cols-5 gap-6">
            {products?.map((product: TProduct) => (
              <Card key={product._id} product={product}></Card>
            ))}
          </div>
        ) : (
          "No Products available for this category"
        )}
      </div>
    </div>
  );
};

export default Products;
