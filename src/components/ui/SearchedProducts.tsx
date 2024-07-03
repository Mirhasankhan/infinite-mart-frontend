import { Input } from "antd";
import { useSearchedProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { useState } from "react";
import { TProduct } from "../../types/product.type";
import { Link } from "react-router-dom";

const SearchedProducts = () => {
  const [search, setSearch] = useState("");
  const { data: searchedData } = useSearchedProductsQuery(search);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="h-full relative">
      <Input
        onChange={handleSearch}
        className="w-full h-12"
        placeholder="Search for..."
        variant="filled"
      />
      {searchedData?.data.length > 0 && (
        <div className="absolute w-full z-50 border">
          <h1 className="text-end bg-gray-300 p-1">Products</h1>
          <div>
            {searchedData?.data.map((search: TProduct) => (
              <Link
                onClick={() => setSearch("")}
                state={{ product: search }}
                to={`products/${search._id}`}
                className="bg-white p-4 flex gap-3 items-center"
                key={search._id}
              >
                <img
                  className="h-12 w-12 rounded-lg"
                  src={search.image.imageUrl}
                  alt=""
                />
                <div>
                  <h1>{search.productName}</h1>
                  <p className="text-orange-500">${search.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
