import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import reviewImage from "../../assets/images/pro.webp";

const ProductDescriptions = ({ product }: { product: TProduct }) => {
  const [active, setActive] = useState("review");
  return (
    <div>
      <div className="flex justify-between gap-3 md:gap-8 my-12 md:mx-16">
        <button
          onClick={() => setActive("review")}
          className={`${
            active == "review"
              ? "bg-primary text-white"
              : "text-primary bg-transparent"
          } py-3 border-primary hover:bg-primary hover:text-white font-medium border w-full rounded-md`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActive("description")}
          className={`${
            active == "description"
              ? "bg-primary text-white"
              : "text-primary bg-transparent"
          } py-3 border-primary hover:bg-primary hover:text-white font-medium border w-full rounded-md`}
        >
          Description
        </button>
        <button
          onClick={() => setActive("policy")}
          className={`${
            active == "policy"
              ? "bg-primary text-white"
              : "text-primary bg-transparent"
          } py-3 border-primary hover:bg-primary hover:text-white font-medium border w-full rounded-md`}
        >
          Return Policy
        </button>
      </div>
      <div>
        {active == "review" && (
          <div>
            {product?.reviews?.length > 0 ? (
              <div className="grid grid-cols-3 gap-8">
                {product?.reviews?.map((review, index) => (
                  <div className="shadow-[0px_4px_15px_rgba(255,69,58,0.15)] p-4 rounded-md my-3" key={index}>
                    <div className="flex items-center gap-3">
                      <img className="h-16 w-16" src={reviewImage} alt="" />

                      <div>
                        <h1 className="font-semibold pb-1 ">{review.username}</h1>
                        <Rating                        
                          style={{ maxWidth: 100 }}                         
                          value={review.rating}
                          readOnly
                        />
                      </div>
                    </div>

                    <p className="pt-2">{review.review} Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa architecto, eligendi dolorem amet dolorum itaque reiciendis excepturi atque reprehenderit natus.</p>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-red-600">
                There is no review for this product yet
              </h1>
            )}
          </div>
        )}
        {active == "description" && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: product.content }} />
          </div>
        )}
        {active == "policy" && (
          <div className="px-3">
            <ul className="list-disc">
              <li>
                If your product is damaged, defective, incorrect or incomplete
                at the time of delivery, please file a return request on call to
                customer care support number within 3 days of the delivery date.
              </li>
              <li>
                Change of mind is not applicable as a Return Reason for this
                product.
              </li>
            </ul>
            <h1 className="font-medium py-3">
              Valid reasons to return an item
            </h1>
            <ul className="list-disc">
              <li>
                Delivered product is damaged (i.e. physically destroyed or
                broken) / defective (e.g. unable to switch on)
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
                Delivered product is does not match product description or
                picture (i.e product not as advertised)
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptions;
