import { useNavigate } from "react-router-dom";
import { TProduct } from "../../types/product.type";

const RelatedProduct = ({ related }: { related: TProduct }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/products/${related._id}`, { state: { product: related } });
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex gap-2 mb-4 bg-gray-100 cursor-pointer border p-3 rounded-md items-center "
    >
      <div>
        <img
          className="w-20 h-20 rounded-lg"
          src={related.image.imageUrl}
          alt=""
        />
      </div>
      <div>
        <h1>{related.productName} </h1>
        <p className="text-orange-600">Price: ${related.price}</p>
      </div>
    </div>
  );
};

export default RelatedProduct;
