import { Tabs, TabsProps } from "antd";
import { TProduct } from "../../types/product.type";

const ProductDescriptions = ({ product }: { product: TProduct }) => {
  console.log(product);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: (
        <div>
          <div dangerouslySetInnerHTML={{ __html: product.content }} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Reviews",
      children: (
        <div>
          {product?.reviews?.map((review) => (
            <div className="border p-2 rounded-md my-3" key={review.review}>
              <h1>{review.username}</h1>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: "Return Policy",
      children: (
        <div>
          <h1>return policy</h1>
        </div>
      ),
    },
  ];
  return <Tabs className="w-full mt-12" defaultActiveKey="1" items={items} />;
};

export default ProductDescriptions;
