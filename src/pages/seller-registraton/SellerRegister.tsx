import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { IoIosCheckmark } from "react-icons/io";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { IoIosCreate } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";

const SellerRegister = () => {
  const [registerAccount] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newAccount = {
      ...data,
      isSeller: true,
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
    <div className="pb-8 bg-gray-100 px-3 md:px-48">
      <h1 className="text-xl md:text-3xl font-semibold text-center py-4">
        Become <span className="text-primary">Seller</span>
      </h1>
      <div className="grid grid-cols-5 gap-16">
        <div className="shadow-xl col-span-5 md:col-span-3 border rounded-lg bg-white p-4  mt-6">
          <Row justify="center">
            <Col span={24}>
              <CustomForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                    <CustomInput
                      placeholder="Company Name"
                      type="text"
                      name="name"
                      label="Company Name"
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
                  className="w-full bg-primary text-white  font-semibold"
                  htmlType="submit"
                >
                  Create Seller Account
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
        </div>
        <div className="text-white font-medium text-xl p-8 rounded-md bg-gradient-to-t from-cyan-500 to-blue-500 col-span-2 hidden md:block">
          <h1 className="">Get Started With</h1>
          <p>Infinite Mart</p>
          <div>
            <h1 className="py-3">Benefits</h1>
            <div className="flex items-center gap-2">
              <IoIosCheckmark className="bg-white text-blue-400 rounded-full" />
              <h1 className="text-sm">Increased Reach and Visibility</h1>
            </div>
            <div className="flex items-center gap-2 my-3">
              <IoIosCheckmark className="bg-white text-blue-400 rounded-full" />
              <h1 className="text-sm">Comprehensive Seller Support</h1>
            </div>
            <div className="flex items-center gap-2">
              <IoIosCheckmark className="bg-white text-blue-400 rounded-full" />
              <h1 className="text-sm">
                Secure and Reliable Payment Processing
              </h1>
            </div>
          </div>
          <div>
            <h1 className="py-3">Steps to start selling</h1>
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-center">
                <IoIosCreate className="text-red-400 text-4xl pb-2"></IoIosCreate>
                <p className="text-sm">Sign Up For Free</p>
              </div>
              <div className="flex flex-col items-center">
                <FaUserCheck className="text-red-400 text-4xl pb-2"></FaUserCheck>
                <p className="text-sm">Add Company Info</p>
              </div>
              <div className="flex flex-col items-center">
                <BsBoxSeamFill className="text-red-400 text-4xl pb-2"></BsBoxSeamFill>
                <p className="text-sm">Add Product</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
