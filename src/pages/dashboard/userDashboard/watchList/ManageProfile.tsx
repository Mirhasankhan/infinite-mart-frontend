import { Button, Col, Row } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/auth/authApi";
import CustomSelect from "../../../../components/form/CustomSelect";
import { provinceData, selectProvince } from "../../../../utils/districts";
import { useEffect, useState } from "react";
import UploadImage from "../../../../components/manageProfile/UploadImage";

const ManageProfile = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: userData, isLoading, isFetching } = useActiveUserQuery(email);
  const [updateCurrentUser] = useUpdateUserMutation();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleChangeProvince = (value: string) => {
    setSelectedProvince(value);
  };
  const handleChangeCity = (value: string) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    const selectedProvinceData = provinceData.find(
      (province) => province.province === selectedProvince
    );

    if (selectedProvinceData) {
      setCityOptions(
        selectedProvinceData.districts.map((sub: string) => ({
          value: sub,
          label: sub,
        }))
      );
    } else {
      setCityOptions([]);
    }
  }, [selectedProvince]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedUser = {
      user: {
        _id: _id,
        updatedUser: {
          city: selectedCity,
          province: selectedProvince,
          name: data.name,
          email: data.email,
          phone: data.phone,
          street: data.street,
        },
      },
    };
    updateCurrentUser(updatedUser);
    console.log(updatedUser);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const { phone, name, _id } = userData.data;

  return (
    <div>
      <h1 className="text-2xl font-medium pb-6">My Profile</h1>
      <div className="md:grid grid-cols-5 gap-4">
        <div className="col-span-1 h-60 bg-cyan-500 p-2 rounded-md ">
          {/* <img className="w-24 h-24 rounded-full" src={profileImage} alt="" /> */}
          <div>
            <UploadImage></UploadImage>
          </div>
        </div>

        <div className="col-span-4 shadow-xl border rounded-lg p-4 bg-white">
          <h1 className="text-xl py-6 font-medium">Billing Information </h1>
          <Row justify="center">
            <Col span={24}>
              <CustomForm onSubmit={onSubmit}>
                <Row gutter={8}>
                  <Col span={12}>
                    <CustomInput
                      placeholder="Your name"
                      type="text"
                      name="name"
                      label="Your Name"
                      defaultValue={name}
                      readOnly
                    />
                  </Col>
                  <Col span={12}>
                    <CustomInput
                      placeholder="your email"
                      type="email"
                      name="email"
                      label="Your Email"
                      defaultValue={email ? email : ""}
                      readOnly
                    />
                  </Col>
                  <Col span={12}>
                    <CustomInput
                      placeholder="contact number"
                      type="number"
                      name="phone"
                      label="Phone"
                      defaultValue={phone ? phone : ""}
                    />
                  </Col>
                  <Col span={12}>
                    <CustomInput
                      placeholder="address in detail"
                      type="text"
                      name="street"
                      label="Street Address"
                    />
                  </Col>
                  <Col span={12}>
                    <CustomSelect
                      label="Province"
                      name="province"
                      options={selectProvince}
                      onChange={handleChangeProvince}
                    />
                  </Col>
                  <Col span={12}>
                    <CustomSelect
                      label="City/Town"
                      name="city"
                      options={cityOptions}
                      onChange={handleChangeCity}
                    />
                  </Col>
                </Row>

                <Button
                  className="w-full bg-orange-400 text-white font-semibold"
                  htmlType="submit"
                >
                  Update Profile Info
                </Button>
              </CustomForm>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
