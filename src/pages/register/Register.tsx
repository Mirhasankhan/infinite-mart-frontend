import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import singImage from "../../assets/images/sign.png";
// import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
// import SocialLogin from "../../components/ui/SocialLogin";

const Register = () => {
  const [registerAccount] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newAccount = {
      ...data,
      isSeller: false,
    };
    const res = await registerAccount(newAccount);
    if (res.data.success) {
      toast.success("account created successfully");
      navigate("/login");
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="pb-16 bg-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4 ">
        Create <span className="text-orange-400">New Account</span>
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 px-3 md:px-40  mt-6 rounded-lg">
        <div className="rounded-l-md p-4 bg-white">
          <Row justify="center">
            <Col span={24}>
              <CustomForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                    <CustomInput
                      placeholder="Full Name"
                      type="text"
                      name="name"
                      label="Name"
                    />
                  </Col>
                </Row>
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

                <Button
                  className="w-full bg-orange-400 text-white  font-semibold"
                  htmlType="submit"
                >
                  Create Account
                </Button>
                <h1 className="pt-3">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600">
                    Login
                  </Link>
                </h1>
              </CustomForm>
            </Col>
          </Row>
          {/* <div className="divider">Or join with</div>
          <div className="cursor-pointer flex gap-2 items-center w-full rounded-md border justify-center py-2">
            <FcGoogle className="text-xl"></FcGoogle>
            <SocialLogin></SocialLogin>
          </div> */}
        </div>

        <div className="hidden md:block">
          <img
            className="w-full h-[390px] rounded-r-md"
            src={singImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
