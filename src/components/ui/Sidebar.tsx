import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { sidebarItemsGenerator } from "../../utils/SidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
import { sellerPaths } from "../../routes/seller.routes";

import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const { Sider } = Layout;

const userRole = {
  USER: "user",
  SELLER: "seller",
};

const Sidebar = () => {
  const { role } = useAppSelector(useCurrentUser);
  const currentRole = role == true ? "seller" : "user";

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
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      style={{
        backgroundColor: "white",
        // overflow: "hidden",
      }}
    >
      <div
        style={{
          color: "black",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          border: "0.2px dotted lightgray",
        }}
      >
        <Link to="/" className="flex items-center">
          <img className="h-10 w-10 rounded-full" src={logo} alt="" />
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="font-bold"
          >
            InfiniteMart
          </h1>
        </Link>
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
