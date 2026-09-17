import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMail,
  FiPackage,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const SellerRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerAccount] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerAccount({ ...data, isSeller: true }).unwrap();

      if (res?.success) {
        toast.success("Seller account created successfully! Please log in.");
        navigate("/login");
      } else {
        toast.error("Failed to create seller account. Please try again.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50/70 flex items-center justify-center py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="p-8 md:p-10 md:col-span-7 flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
              <HiOutlineSparkles className="text-[#874f6a]" />
              <span>Grow With Infinite Mart</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Start Selling Today
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Create your seller account and put your products in front of more
              customers.
            </p>
          </div>

          <CustomForm onSubmit={onSubmit}>
            <CustomInput
              placeholder="e.g. Acme Home Goods"
              type="text"
              name="name"
              label="Company Name"
              prefix={<FiBriefcase className="text-slate-400 mr-1" />}
            />
            <CustomInput
              placeholder="name@company.com"
              type="email"
              name="email"
              label="Business Email"
              prefix={<FiMail className="text-slate-400 mr-1" />}
            />
            <CustomInput
              placeholder="Create a strong password"
              type="password"
              name="password"
              label="Password"
              prefix={<FiLock className="text-slate-400 mr-1" />}
            />
            <button
              className="w-full bg-[#874f6a] hover:bg-[#743e58] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm shadow-[#874f6a]/20 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer text-sm mt-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : (
                "Create Seller Account"
              )}
            </button>
          </CustomForm>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#874f6a] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-[#37192b] p-8 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#874f6a]/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-6 border border-white/10">
              <span>Seller Benefits</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Turn Your Products Into Possibility.
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Reach new customers with the tools and support you need to build a
              thriving store.
            </p>
          </div>

          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiBarChart2 className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Reach More Shoppers
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Get discovered by customers actively looking for your
                  products.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiCreditCard className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Simple, Secure Payouts
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Manage orders and receive payments through one trusted
                  platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiPackage className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Tools To Keep Growing
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Track performance and keep your catalog moving forward.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <FiCheckCircle /> Seller support included
            </span>
            <span>Join Infinite Mart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
