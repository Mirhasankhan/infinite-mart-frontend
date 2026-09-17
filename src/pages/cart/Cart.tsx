import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCartsQuery,
  useDeleteCartMutation,
} from "../../redux/features/cart/cartManagement.api";
import { TCart } from "../../types/cart.type";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import useUpdateCartQuantity from "../../utils/updateQuantity";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import {
  HiMinus,
  HiPlus,
  HiArrowLeft,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { IoShieldCheckmarkOutline, IoLockClosedOutline } from "react-icons/io5";
import { FaBolt } from "react-icons/fa6";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { email } = useAppSelector(useCurrentUser);
  const { handleUpdateQuantity } = useUpdateCartQuantity();
  const [deleteCart] = useDeleteCartMutation();
  const { data: cartData, isLoading } = useCartsQuery(email);

  const cartItems: TCart[] = cartData?.data || [];
  const itemCount = cartItems.reduce(
    (acc: number, item: TCart) => acc + (item.cartQuantity || 1),
    0
  );

  const totalCost = cartItems.reduce(
    (acc: number, product: TCart) => acc + +product.totalCost,
    0
  );

  const shippingCost = cartItems.length > 0 ? 50 : 0;
  const grandTotal = totalCost + shippingCost;

  const handleDeleteCart = (id: string) => {
    deleteCart(id);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50/60 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold">Shopping Cart</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <span className="text-sm font-semibold text-gray-500">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-72 animate-pulse" />
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 px-4 sm:px-6">
                {cartItems.map((cart: TCart) => {
                  const productUrl = `/products/${cart.referenceId || cart._id}`;
                  const itemSubtotal = +cart.price * cart.cartQuantity;

                  return (
                    <div
                      key={cart._id}
                      className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Details & Image */}
                      <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                        <Link
                          to={productUrl}
                          className="shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-2xs group"
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={cart.image.imageUrl}
                            alt={cart.productName}
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          {cart.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                              {cart.category}
                            </span>
                          )}
                          <Link
                            to={productUrl}
                            className="text-sm sm:text-base font-semibold text-gray-800 hover:text-primary transition-colors line-clamp-2 leading-snug"
                          >
                            {cart.productName}
                          </Link>
                          {cart.flashSale && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 border border-amber-200/60">
                              <FaBolt className="text-[8px]" /> Flash Deal
                            </span>
                          )}
                          {/* Mobile Price Display */}
                          <div className="flex items-center gap-2 mt-1 md:hidden">
                            <span className="text-xs font-semibold text-gray-500">
                              ${(+cart.price).toFixed(2)} each
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price (Desktop) */}
                      <div className="hidden md:block col-span-2 text-center text-sm font-semibold text-gray-700">
                        ${(+cart.price).toFixed(2)}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-xs font-medium text-gray-500 md:hidden">
                          Quantity:
                        </span>
                        <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50/70 shadow-2xs overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(cart, false)}
                            disabled={cart.cartQuantity <= 1}
                            className="p-2 text-gray-600 hover:text-primary hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <HiMinus className="text-xs" />
                          </button>
                          <span className="w-9 text-center font-bold text-xs sm:text-sm text-gray-900 select-none">
                            {cart.cartQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(cart, true)}
                            className="p-2 text-gray-600 hover:text-primary hover:bg-white transition-colors focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <HiPlus className="text-xs" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Delete Action */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                        <span className="text-xs font-medium text-gray-500 md:hidden">
                          Subtotal:
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          ${itemSubtotal.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCart(cart._id)}
                          title="Remove item"
                          aria-label="Remove item"
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
                        >
                          <RiDeleteBin6Line className="text-lg" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#724158] transition-colors"
                >
                  <HiArrowLeft className="text-base" />
                  <span>Continue Shopping</span>
                </Link>

                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <IoShieldCheckmarkOutline className="text-base text-emerald-600" />
                  <span>Items saved in your cart are reserved during session</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-gray-900">
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-2xl font-extrabold text-primary tracking-tight">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 text-right mt-0.5">
                      Includes delivery charges
                    </p>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full mt-6">
                  <Button
                    buttonName="Proceed to Checkout"
                    className="w-full py-3 text-sm font-semibold shadow-md hover:shadow-lg"
                  />
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <IoLockClosedOutline className="text-emerald-600 text-base shrink-0" />
                    <span>Bank-grade 256-bit encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoShieldCheckmarkOutline className="text-emerald-600 text-base shrink-0" />
                    <span>100% Authentic products guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-16 px-6 text-center max-w-xl mx-auto my-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 ring-8 ring-primary/5">
              <HiOutlineShoppingBag className="text-4xl stroke-[1.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
              Looks like you haven't added any products to your cart yet. Explore our
              featured categories, new arrivals, and special deals!
            </p>
            <Link to="/products">
              <Button
                buttonName="Start Shopping"
                className="py-2.5 px-6 text-sm font-semibold shadow-md hover:shadow-lg"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

