import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import ProductDescriptions from "./ProductDescriptions";
import { useCategoryProductsQuery } from "../../redux/features/products/prouductManagement.api";
import { TProduct } from "../../types/product.type";
import Card from "../../components/ui/Card";
import Details from "./Details";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [transform, setTransform] = useState("scale(1)");
  const [origin, setOrigin] = useState("center center");
  const location = useLocation();
  const { product } = location.state;
  const { data: categoryData } = useCategoryProductsQuery(product.category);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setOrigin(`${x}% ${y}%`);
    setTransform("scale(2)");
  };

  const handleMouseLeave = () => {
    setTransform("scale(1)");
    setOrigin("center center");
  };

  const { image } = product;

  return (
    <div className="px-3 md:px-16 py-6 mt-6">
      <div className="bg-white p-4 rounded-md">
        <div className="grid grid-cols-6 gap-6 rounded-md">
          <div className="bg-gray-100 col-span-6 md:col-span-3">
            <div
              className="h-64 md:h-[584px] rounded-md w-full overflow-hidden hover:cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-300"
                src={image.imageUrl}
                style={{ transform, transformOrigin: origin }}
              />
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Details product={product}></Details>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <ProductDescriptions product={product}></ProductDescriptions>
          <div>
            <h1 className="pt-12 pb-3 text-xl font-medium">Related Products</h1>
            <div className="grid grid-cols-4 gap-4">
              {categoryData?.data.map((category: TProduct) => (
                <Card product={category}></Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
