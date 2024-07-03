import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { sidebarItemsGenerator } from "../../utils/SidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
import { sellerPaths } from "../../routes/seller.routes";
import profile from "../../assets/images/profile.png";
import { useActiveUserQuery } from "../../redux/features/auth/authApi";

const { Sider } = Layout;

const userRole = {
  USER: "user",
  SELLER: "seller",
};

const Sidebar = () => {
  const { role, email } = useAppSelector(useCurrentUser);
  const currentRole = role == true ? "seller" : "user";
  const { data: userData } = useActiveUserQuery(email);
  const profileImage = userData?.data.image
    ? userData.data.image.imageUrl
    : profile;

  let sidebarItems;

  switch (currentRole) {
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, userRole.SELLER);
      break;

    default:
      break;
  }

  return (
    <Sider
      className="my-12"
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          color: "black",
          textAlign: "center",
          height: "11rem",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <div className="bg-orange-500 w-full flex flex-col items-center text-white">
          <img
            className="w-16 h-16 mt-6 rounded-full"
            src={profileImage}
            alt=""
          />
          <h1 className="my-2 font-medium">{userData?.data.name}</h1>
          <h1>{userData?.data.email}</h1>
        </div>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        style={{
          backgroundColor: "white",
        }}
      />
    </Sider>
  );
};

export default Sidebar;
