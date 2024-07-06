import { Tabs, TabsProps } from "antd";
import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductDescriptions = ({ product }: { product: TProduct }) => {
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
          {product?.reviews?.length > 0 ? (
            <div>
              {product?.reviews?.map((review) => (
                <div className="border p-2 rounded-md my-3" key={review.review}>
                  <h1 className=" font-medium">Review By: {review.username}</h1>
                  <div className="flex items-center gap-3">
                    <p>Rating: </p>
                    <Rating
                      className="mt-auto"
                      style={{ maxWidth: 80 }}
                      // value={Math.round(testi.rating)}
                      value={review.rating}
                      readOnly
                    />
                  </div>

                  <p>Review: {review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-red-600">
              There is no review for this product yet
            </h1>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Return Policy",
      children: (
        <div className="px-3">
          <ul className="list-disc">
            <li>
              If your product is damaged, defective, incorrect or incomplete at
              the time of delivery, please file a return request on call to
              customer care support number within 3 days of the delivery date.
            </li>
            <li>
              Change of mind is not applicable as a Return Reason for this
              product.
            </li>
          </ul>
          <h1 className="font-medium py-3">Valid reasons to return an item</h1>
          <ul className="list-disc">
            <li>
              Delivered product is damaged (i.e. physically destroyed or broken)
              / defective (e.g. unable to switch on)
            </li>
            <li>
              Delivered product is incomplete (i.e. has missing items and/or
              accessories)
            </li>
            <li>
              Delivered product is incorrect (i.e. wrong product/size/colour,
              fake item, or expired)
            </li>
            <li>
              Delivered product is does not match product description or picture
              (i.e product not as advertised)
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return <Tabs className="w-full mt-12" defaultActiveKey="1" items={items} />;
};

export default ProductDescriptions;
