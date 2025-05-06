import { FieldValues, SubmitHandler } from "react-hook-form";
import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import loginImage from "../../assets/images/login.png";
import SocialLogin from "../../components/ui/SocialLogin";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginAccount] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await loginAccount(data).unwrap();

    if (res.success) {
      toast.success("loggedin successfully");
      dispatch(
        setUser({
          name: res.data.name,
          email: res.data.email,
          role: res.data.isSeller,
          token: "token will come",
        })
      );
      navigate("/");
      setIsLoading(false);
    } else {
      console.log("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-8 min-h-screen bg-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4 my-6">
        Log Into <span className="text-primary">Your Account</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full px-3 md:w-2/3 2xl:w-1/2 mx-auto">
        <div className="rounded-l-lg bg-white p-6  w-full border">
          <Row justify="center">
            <Col span={24}>
              <CustomForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24}>
                    <CustomInput
                      placeholder="email"
                      type="email"
                      name="email"
                      label="Email"
                    />
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={24}>
                    <CustomInput
                      placeholder="password"
                      type="password"
                      name="password"
                      label="Password"
                    />
                  </Col>
                </Row>
                <button
                  className="w-full bg-primary rounded-md py-2 font-semibold text-white"
                  type="submit"
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="animate-spin font-medium mx-auto"
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <h1 className="pb-6 pt-2">
                  Don't have an account?
                  <Link to="/register" className="text-blue-600">
                    Create New Account
                  </Link>
                </h1>
              </CustomForm>
            </Col>
          </Row>
          <div className="divider">Or join with</div>
          <div className="cursor-pointer flex gap-2 items-center w-full rounded-md border justify-center py-2">
            <FcGoogle className="text-xl"></FcGoogle>
            <SocialLogin></SocialLogin>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            className="h-[450px] w-full rounded-r-lg"
            src={loginImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
