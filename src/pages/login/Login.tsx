import { FieldValues, SubmitHandler } from "react-hook-form";
import { Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import SocialLogin from "../../components/ui/SocialLogin";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiMail, FiLock, FiShield, FiTruck, FiCreditCard } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginAccount] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginAccount(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        dispatch(
          setUser({
            name: res.data.name,
            email: res.data.email,
            role: res.data.isSeller,
            token: "token will come",
          })
        );
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50/70 flex items-center justify-center py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Form */}
        <div className="p-8 md:p-10 md:col-span-7 flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
              <HiOutlineSparkles className="text-[#874f6a]" />
              <span>Welcome Back</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Enter your credentials to access your orders and wishlist.
            </p>
          </div>

          <CustomForm onSubmit={onSubmit}>
            <CustomInput
              placeholder="name@example.com"
              type="email"
              name="email"
              label="Email Address"
              prefix={<FiMail className="text-slate-400 mr-1" />}
            />

            <CustomInput
              placeholder="Enter your password"
              type="password"
              name="password"
              label="Password"
              prefix={<FiLock className="text-slate-400 mr-1" />}
            />

            <div className="flex items-center justify-between mb-5 text-sm">
              <Checkbox className="text-slate-600">Remember me</Checkbox>
              <button
                type="button"
                onClick={() =>
                  toast.info("Please contact support to reset your password.")
                }
                className="text-[#874f6a] hover:underline font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              className="w-full bg-[#874f6a] hover:bg-[#743e58] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm shadow-[#874f6a]/20 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer text-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : (
                "Sign In"
              )}
            </button>
          </CustomForm>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLogin text="Sign in with Google" />

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-2 text-center text-sm text-slate-600">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#874f6a] font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
            <p className="text-xs text-slate-400">
              Are you a merchant?{" "}
              <Link
                to="/register-seller"
                className="text-slate-600 font-medium hover:text-[#874f6a] underline"
              >
                Register as a Seller
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visual Showcase Panel */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-[#37192b] p-8 flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#874f6a]/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700/20 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-6 border border-white/10">
              <span>Infinite Mart</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Everyday Shopping, Elevated.
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Explore thousands of verified products, flash deals, and express delivery directly to your door.
            </p>
          </div>

          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiShield className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Protected Payments</h4>
                <p className="text-xs text-slate-300 mt-0.5">Encrypted transactions & guaranteed refunds.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiTruck className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Express & Tracked Delivery</h4>
                <p className="text-xs text-slate-300 mt-0.5">Live shipment updates from dispatch to doorstep.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-[#874f6a]/30 text-rose-200 shrink-0">
                <FiCreditCard className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Verified Merchant Network</h4>
                <p className="text-xs text-slate-300 mt-0.5">Only vetted sellers with authentic guarantees.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>⭐ 4.9/5 Average rating</span>
            <span>25,000+ happy buyers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
