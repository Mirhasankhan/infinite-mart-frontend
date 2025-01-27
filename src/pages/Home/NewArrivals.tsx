import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import Button from "../../components/ui/Button";

const NewArrivals = () => {
  const { data } = useProductsQuery("");
  return (
    <div className="px-3 md:px-14 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl">New Arrivals</h1>
        <Link to="/products">
          <Button buttonName="See More"></Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data?.data
          .slice()
          .reverse()
          .slice(0, 4)
          .map((product: TProduct) => (
            <Card key={product._id} product={product}></Card>
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
