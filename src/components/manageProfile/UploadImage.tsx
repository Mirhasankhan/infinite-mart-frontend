import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  useActiveUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  HiOutlineMail,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiX,
  HiCheck,
} from "react-icons/hi";
import profilePlaceholder from "../../assets/images/profile.png";
import { Spin } from "antd";

interface UploadImageProps {
  userData?: any;
}

const UploadImage = ({ userData: initialUserData }: UploadImageProps) => {
  const [updateCurrentUser] = useUpdateUserMutation();
  const { email } = useAppSelector(useCurrentUser);
  const { data: fetchedUserData, isLoading, isFetching } = useActiveUserQuery(
    email,
    { skip: !!initialUserData }
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Clean up object URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const activeUser = initialUserData?.data || fetchedUserData?.data;

  if (!activeUser && (isLoading || isFetching)) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[340px]">
        <Spin size="large" />
        <p className="text-xs text-gray-400 mt-3 font-medium">Loading profile...</p>
      </div>
    );
  }

  const { _id, name, isSeller, address } = activeUser || {};
  const currentImageUrl = activeUser?.image?.imageUrl || profilePlaceholder;
  const displayImage = previewUrl || currentImageUrl;

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file (PNG, JPG, WEBP)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const objUrl = URL.createObjectURL(file);
      setPreviewUrl(objUrl);
    }
  };

  const handleCancelPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
      if (!apiKey) {
        throw new Error("Image upload token is missing in environment variables.");
      }

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const imgUrl = imgbbResponse?.data?.data?.url;
      if (!imgUrl) {
        throw new Error("Failed to get uploaded image URL.");
      }

      const updatedUser = {
        user: {
          _id: _id,
          updatedUser: {
            image: {
              imageUrl: imgUrl,
            },
          },
        },
      };

      await updateCurrentUser(updatedUser).unwrap();
      toast.success("Profile photo updated successfully!");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || err?.message || "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const province = address?.province || activeUser?.province;
  const city = address?.city || activeUser?.city;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Top Gradient Banner */}
      <div className="h-28 bg-gradient-to-r from-[#874f6a] via-[#9d5e7d] to-[#b87697] relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/20">
            <HiOutlineSparkles className="text-amber-200 text-sm" />
            {isSeller ? "Seller Portal" : "Customer Portal"}
          </span>
        </div>
      </div>

      {/* Avatar & Main Content */}
      <div className="px-6 pb-6 text-center">
        {/* Avatar Container */}
        <div className="relative -mt-14 inline-block mx-auto">
          <div className="relative group">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg bg-gray-50 transition-transform duration-300 group-hover:scale-105"
              src={displayImage}
              alt={name || "User Profile"}
            />
            {/* Camera Trigger Button */}
            <button
              type="button"
              onClick={handleIconClick}
              disabled={isUploading}
              aria-label="Upload profile picture"
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#874f6a] hover:bg-[#724058] text-white shadow-md border-2 border-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-50"
              title="Change profile photo"
            >
              <FaCamera className="text-xs" />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Selected Image Action Buttons */}
        {selectedFile && (
          <div className="mt-3 p-3 bg-purple-50/70 border border-purple-100 rounded-xl animate__animated animate__fadeIn">
            <p className="text-xs text-[#874f6a] font-medium mb-2">
              New photo selected! Save to update your profile.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#874f6a] hover:bg-[#703f56] text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isUploading ? (
                  <Spin size="small" className="text-white" />
                ) : (
                  <HiCheck className="text-sm" />
                )}
                {isUploading ? "Uploading..." : "Save Photo"}
              </button>
              <button
                type="button"
                onClick={handleCancelPreview}
                disabled={isUploading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <HiX className="text-sm" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* User Details */}
        <div className="mt-3">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {name || "Infinite Mart User"}
            </h2>
            <HiOutlineCheckCircle
              className="text-[#874f6a] text-lg"
              title="Verified Account"
            />
          </div>

          {email && (
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
              <HiOutlineMail className="text-gray-400" />
              <span>{typeof email === "string" ? email : activeUser?.email}</span>
            </p>
          )}

          {/* Badges */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                isSeller
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-purple-50 text-[#874f6a] border-purple-200"
              }`}
            >
              <HiOutlineShieldCheck className="text-sm" />
              {isSeller ? "Verified Seller" : "Verified Customer"}
            </span>

            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              Active
            </span>
          </div>

          {/* Location Details */}
          {(city || province) && (
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-600">
              <FaLocationDot className="text-[#874f6a] shrink-0" />
              <span>
                {[city, province].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
