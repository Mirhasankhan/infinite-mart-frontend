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
    <div className="px-3 md:px-14 2xl:px-60 py-8 mt-4">
      {/* Main Product Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Panel */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 min-h-[320px] md:min-h-[580px]">
            <div
              className="h-full w-full overflow-hidden hover:cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-300 min-h-[320px] md:min-h-[580px]"
                src={image.imageUrl}
                style={{ transform, transformOrigin: origin }}
                alt={product.productName}
              />
            </div>
            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              Hover to zoom
            </div>
          </div>

          {/* Details Panel */}
          <div className="p-6 md:p-8 flex flex-col justify-start">
            <Details product={product} />
          </div>
        </div>
      </div>

      {/* Descriptions Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <ProductDescriptions product={product} />
      </div>

      {/* Related Products */}
      {categoryData?.data?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryData.data.map((category: TProduct) => (
              <Card key={category._id} product={category} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
