import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TProduct } from "../../types/product.type";
import Card from "../../components/ui/Card";
import spinner from "../../assets/spinner.json";
import Lottie from "lottie-react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Button } from "antd";
import { FaHome } from "react-icons/fa";

const Products = () => {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(() => setLoading(false)); // In case of an error, stop loading
  }, [category]);

  return (
    <div className="my-8 px-3 md:px-14">
      {loading ? (
        <Lottie
          style={{ height: "400px", width: "600px" }}
          animationData={spinner}
          loop={true}
        />
      ) : (
        <>
          <Link to="/" className="flex gap-1 items-center">
            <FaHome></FaHome>
            <h1>Home</h1>
          </Link>
          <div className="mt-6">
            {products?.length > 0 ? (
              <div className="grid grid-cols-5 gap-6">
                {products?.map((product: TProduct) => (
                  <Card key={product._id} product={product}></Card>
                ))}
              </div>
            ) : (
              <div className="bg-white p-4 mt-4 border-t-4 border border-blue-600 md:flex justify-between">
                <div className="flex items-center gap-2">
                  <MdCheckBoxOutlineBlank className="text-blue-300 text-xl"></MdCheckBoxOutlineBlank>
                  <h1>No Product availabe on this category</h1>
                </div>
                <Link to={"/"}>
                  <Button className="bg-green-400 text-white font-medium mt-2">
                    Browse Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
