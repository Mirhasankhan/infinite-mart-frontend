import Card from "../../components/ui/Card";
import { useProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";

const NewArrivals = () => {
  const { data } = useProductsQuery("");
  return (
    <div className="px-3 md:px-14 mb-6">
      <h1 className="text-xl md:text-2xl mb-6">New Arrivals</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {data?.data
          .slice()
          .reverse()
          .slice(0, 5)
          .map((product: TProduct) => (
            <Card key={product._id} product={product}></Card>
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
