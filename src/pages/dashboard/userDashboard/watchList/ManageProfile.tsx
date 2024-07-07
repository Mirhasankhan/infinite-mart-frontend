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
import profile from "../../../../assets/images/profile.png";
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

  const profileImage = userData?.data?.image
    ? userData?.data?.image.imageUrl
    : profile;

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
      <div className="bg-cyan-500 p-6 rounded-md flex justify-between items-center">
        <img className="w-24 h-24 rounded-full" src={profileImage} alt="" />
        <div>
          <UploadImage></UploadImage>
        </div>
      </div>
      <h1 className="text-xl py-6 font-medium">Billing Information </h1>
      <div className="shadow-xl border rounded-lg p-4 bg-white">
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
  );
};

export default ManageProfile;
