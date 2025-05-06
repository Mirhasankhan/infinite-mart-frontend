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
        className="w-full md:h-12 h-8"
        placeholder="Search for..."
        variant="filled"
      />
      {searchedData?.data.length > 0 ? (
        <div className="absolute w-full z-50 border">
          <h1 className="text-end bg-gray-300 p-1">Products</h1>
          <div className="max-h-96 overflow-auto">
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
      ) : (
        <div>
          {search && (
            <h1 className="text-primary absolute bg-white w-full p-6 rounded-b-lg z-50">
              Sorry! Nothing found for this search
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
