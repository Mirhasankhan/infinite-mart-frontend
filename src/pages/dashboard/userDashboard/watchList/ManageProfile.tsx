import { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import { useAppSelector } from "../../../../redux/hooks";
import { useCurrentUser } from "../../../../redux/features/auth/authSlice";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/auth/authApi";
import { provinceData, selectProvince } from "../../../../utils/districts";
import UploadImage from "../../../../components/manageProfile/UploadImage";
import { toast } from "sonner";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineLockClosed,
  HiOutlineCheck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";

const ManageProfile = () => {
  const { email } = useAppSelector(useCurrentUser);
  const userEmail = typeof email === "string" ? email : "";
  const { data: userData, isLoading, isFetching } = useActiveUserQuery(userEmail);
  const [updateCurrentUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form fields when userData loads
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      const initialName = user?.name || "";
      const initialPhone = user?.phone || "";
      const initialStreet = user?.address?.street || user?.street || "";
      const initialProvince = user?.address?.province || user?.province || "";
      const initialCity = user?.address?.city || user?.city || "";

      setName(initialName);
      setPhone(initialPhone);
      setStreet(initialStreet);
      setSelectedProvince(initialProvince);
      setSelectedCity(initialCity);
      setHasChanges(false);
    }
  }, [userData]);

  // Update city options dynamically whenever province changes
  useEffect(() => {
    if (selectedProvince) {
      const matchedProvince = provinceData.find(
        (p) => p.province.toLowerCase() === selectedProvince.toLowerCase()
      );

      if (matchedProvince) {
        const options = matchedProvince.districts.map((d: string) => ({
          value: d,
          label: d,
        }));
        setCityOptions(options);

        // If currently selected city is not in the new province, clear it
        if (selectedCity && !matchedProvince.districts.includes(selectedCity)) {
          setSelectedCity("");
        }
      } else {
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
      setSelectedCity("");
    }
  }, [selectedProvince]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setHasChanges(true);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setHasChanges(true);
  };

  const handleReset = () => {
    if (userData?.data) {
      const user = userData.data;
      setName(user?.name || "");
      setPhone(user?.phone || "");
      setStreet(user?.address?.street || user?.street || "");
      setSelectedProvince(user?.address?.province || user?.province || "");
      setSelectedCity(user?.address?.city || user?.city || "");
      setHasChanges(false);
      toast.info("Form values restored to saved profile.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }

    if (!userData?.data?._id) {
      toast.error("User information not found. Please refresh.");
      return;
    }

    try {
      const updatedUser = {
        user: {
          _id: userData.data._id,
          updatedUser: {
            name: name.trim(),
            email: userData.data.email || userEmail,
            phone: phone.trim(),
            street: street.trim(),
            province: selectedProvince,
            city: selectedCity,
            address: {
              street: street.trim(),
              province: selectedProvince,
              city: selectedCity,
            },
          },
        },
      };

      await updateCurrentUser(updatedUser).unwrap();
      toast.success("Profile information updated successfully!");
      setHasChanges(false);
    } catch (error: any) {
      console.error("Update profile failed:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile. Please try again."
      );
    }
  };

  // Skeleton loading state
  if (isLoading || (isFetching && !userData)) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-16 bg-gray-100 rounded-2xl w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="h-[380px] bg-gray-100 rounded-2xl" />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="h-[280px] bg-gray-100 rounded-2xl" />
            <div className="h-[280px] bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const activeUser = userData?.data;
  const isSeller = activeUser?.isSeller;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Page Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50/50 to-white border border-purple-100/70 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#874f6a]/10 text-[#874f6a]">
                <HiOutlineSparkles className="text-xs" />
                Account Settings
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isSeller
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <HiOutlineShieldCheck className="text-xs" />
                {isSeller ? "Merchant Account" : "Buyer Account"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Manage Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your personal details, contact information, and shipping address.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-400">Account Status</p>
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Verified & Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card & Avatar */}
        <div className="lg:col-span-4 sticky top-6">
          <UploadImage userData={userData} />
        </div>

        {/* Right Column: Profile Edit Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#874f6a]">
                    <HiOutlineUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Personal Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      Your identity and contact information across Infinite Mart
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    prefix={<HiOutlineUser className="text-gray-400 mr-1.5 text-base" />}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="Enter your full name"
                    className="rounded-xl border-gray-200 hover:border-gray-300 focus:border-[#874f6a] transition-all"
                    required
                  />
                </div>

                {/* Email (Readonly) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-700">
                      Email Address
                    </label>
                    <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                      <HiOutlineLockClosed className="text-xs" /> Primary Login
                    </span>
                  </div>
                  <Input
                    size="large"
                    prefix={<HiOutlineMail className="text-gray-400 mr-1.5 text-base" />}
                    value={activeUser?.email || userEmail}
                    disabled
                    readOnly
                    className="rounded-xl bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-200"
                  />
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    size="large"
                    type="tel"
                    prefix={<HiOutlinePhone className="text-gray-400 mr-1.5 text-base" />}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="e.g. +880 1712 345678"
                    className="rounded-xl border-gray-200 hover:border-gray-300 focus:border-[#874f6a] transition-all"
                  />
                  <p className="text-[11px] text-gray-400">
                    Used by courier services to contact you during delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery & Shipping Address Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all hover:shadow-md">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#874f6a]">
                    <HiOutlineLocationMarker className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Shipping & Delivery Address
                    </h2>
                    <p className="text-xs text-gray-500">
                      Your default address used for dispatching orders and computing shipping rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Province / Division */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Division / Province
                  </label>
                  <Select
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    value={selectedProvince || undefined}
                    placeholder="Select Division / Province"
                    options={selectProvince}
                    onChange={handleProvinceChange}
                    className="w-full rounded-xl"
                  />
                </div>

                {/* City / District */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    City / District
                  </label>
                  <Select
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    value={selectedCity || undefined}
                    placeholder={
                      selectedProvince
                        ? "Select City / District"
                        : "Please select division first"
                    }
                    options={cityOptions}
                    onChange={handleCityChange}
                    disabled={!selectedProvince || cityOptions.length === 0}
                    className="w-full rounded-xl"
                  />
                </div>

                {/* Detailed Street Address */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Street Address / House Details
                  </label>
                  <Input.TextArea
                    rows={3}
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="House / Apartment #, Road #, Sector, Area or Landmark"
                    className="rounded-xl border-gray-200 hover:border-gray-300 focus:border-[#874f6a] transition-all p-3"
                  />
                  <p className="text-[11px] text-gray-400">
                    Provide exact road numbers and landmarks to avoid shipment delays.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-500 text-center sm:text-left">
                {hasChanges ? (
                  <span className="text-amber-600 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    You have unsaved changes
                  </span>
                ) : (
                  <span className="text-gray-400">
                    All profile information is currently saved.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  type="default"
                  size="large"
                  onClick={handleReset}
                  disabled={!hasChanges || isUpdating}
                  className="w-1/2 sm:w-auto rounded-xl border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-1.5 text-xs font-medium"
                >
                  <HiOutlineRefresh className="text-sm" />
                  Reset
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isUpdating}
                  className="w-1/2 sm:w-auto rounded-xl bg-[#874f6a] hover:bg-[#724058] text-white shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 text-xs font-semibold px-6 border-none"
                >
                  {!isUpdating && <HiOutlineCheck className="text-base" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
