import { TProduct } from "../../types/product.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { MdRateReview, MdOutlineDescription, MdOutlineAssignmentReturn } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

const TABS = [
  { key: "review", label: "Reviews", icon: MdRateReview },
  { key: "description", label: "Description", icon: MdOutlineDescription },
  { key: "policy", label: "Return Policy", icon: MdOutlineAssignmentReturn },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-pink-100 text-pink-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
];

const ProductDescriptions = ({ product }: { product: TProduct }) => {
  const [active, setActive] = useState("review");

  return (
    <div className="mt-10">
      {/* Tab Bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              active === key
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="text-base" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {/* Reviews Tab */}
        {active === "review" && (
          <div>
            {product?.reviews?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          AVATAR_COLORS[index % AVATAR_COLORS.length]
                        }`}
                      >
                        {getInitials(review.username || "U")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 leading-tight">
                          {review.username}
                        </p>
                        <Rating
                          style={{ maxWidth: 80 }}
                          value={review.rating}
                          readOnly
                        />
                      </div>
                      <span className="ml-auto text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        {review.rating}/5
                      </span>
                    </div>
                    {/* Review text */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {review.review ||
                        "Great product, very satisfied with the quality and delivery speed!"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiAlertCircle className="text-2xl text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No reviews yet</p>
                <p className="text-sm text-gray-400">
                  Be the first to review this product.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description Tab */}
        {active === "description" && (
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {product.content ? (
              <div dangerouslySetInnerHTML={{ __html: product.content }} />
            ) : (
              <p className="text-gray-400 italic">No description available.</p>
            )}
          </div>
        )}

        {/* Return Policy Tab */}
        {active === "policy" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <FiAlertCircle className="text-amber-500 text-lg flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                If your product is damaged, defective, incorrect or incomplete at
                the time of delivery, please file a return request within{" "}
                <span className="font-semibold">3 days</span> of delivery.
                Change of mind is <span className="font-semibold">not</span> a
                valid return reason.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Valid Reasons to Return
              </h3>
              <ul className="space-y-2">
                {[
                  "Product is physically damaged or defective (e.g. unable to switch on)",
                  "Product is incomplete — missing items or accessories",
                  "Wrong product, size, colour, or expired item delivered",
                  "Product does not match its description or photos",
                ].map((reason, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptions;
