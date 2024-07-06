import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useActiveUserQuery } from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import profile from "../../assets/images/profile.png";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";

const { Content, Header } = Layout;

const DashboardLayout = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: userData } = useActiveUserQuery(email);
  const profileImage = userData?.data?.image
    ? userData?.data?.image.imageUrl
    : profile;
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div>
            <h1 className="font-medium">{userData?.data?.email}</h1>
          </div>
          <div className="flex gap-6 text-4xl">
            <FaRegMoon className="border p-2 bg-cyan-500"></FaRegMoon>
            <MdMarkEmailUnread className="border p-2 bg-cyan-500"></MdMarkEmailUnread>
            <IoNotificationsCircleSharp className="border p-2 bg-cyan-500"></IoNotificationsCircleSharp>
          </div>
          <div>
            <div className=" w-full flex items-center text-white">
              <div>
                <img
                  className="w-12 h-12 border p-1 rounded-full"
                  src={profileImage}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 650,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
