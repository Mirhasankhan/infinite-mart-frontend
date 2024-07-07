import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TProduct } from "../../types/product.type";
import Card from "../../components/ui/Card";
import spinner from "../../assets/spinner.json";
import Lottie from "lottie-react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Button } from "antd";
import { FaHome } from "react-icons/fa";
import Categories from "../Home/Categories/Categories";

const Products = () => {
  const [params] = useSearchParams();
  const category = params.get("category");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  console.log(sort);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://infinite-mart-server.vercel.app/api/v1/product/allProducts?sort=${sort}`
    )
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
  }, [category, sort]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <div className=" rounded-md bg-cyan-500">
        <Categories></Categories>
      </div>
      <div className="my-8 px-3 md:px-14">
        {loading ? (
          <Lottie
            style={{ height: "400px", width: "600px" }}
            animationData={spinner}
            loop={true}
          />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Link to="/" className="flex gap-1 mt-4 items-center">
                <FaHome></FaHome>
                <h1>Home</h1>
              </Link>
              <div className="mb-4">
                <label className="text-gray-500" htmlFor="sort">
                  Sort by Price:{" "}
                </label>
                <select
                  className="border hover:border-blue-500 rounded-md p-2"
                  id="sort"
                  onChange={handleSortChange}
                >
                  <option value="">All</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="lowest">Price: Low to High</option>
                </select>
              </div>
            </div>

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
    </div>
  );
};

export default Products;
