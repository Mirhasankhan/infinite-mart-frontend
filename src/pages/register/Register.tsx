import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const [registerAccount] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newAccount = {
      ...data,
      role: "user",
    };
    registerAccount(newAccount);
    navigate("/login");
  };

  return (
    <div className="mb-8">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4">
        Create <span className="text-orange-400">New Account</span>
      </h1>
      <div className="shadow-xl border rounded-lg p-4 w-3/4 md:w-1/3 mx-auto mt-6">
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
        <div className="divider">Or join with</div>
        <div className="flex gap-2 items-center w-full rounded-md border justify-center py-2">
          <FcGoogle className="text-xl"></FcGoogle>
          <h1>Sign In With Google</h1>
        </div>
        <div className="mt-3 flex gap-2 items-center w-full rounded-md border justify-center py-2">
          <SiFacebook className="text-xl"></SiFacebook>
          <h1>Sign In With Facebook</h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
