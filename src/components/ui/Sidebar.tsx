import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { sidebarItemsGenerator } from "../../utils/SidebarItemsGenerator";
import { userPaths } from "../../routes/user.routes";
import { sellerPaths } from "../../routes/seller.routes";

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
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <h1 className="font-semibold">Infinite Mart </h1>
          {/* <div className="flex flex-col items-center justify-center bg-red-400 w-full h-full pl-2 pr-3">
            <FaUserCircle className="text-5xl"></FaUserCircle>
            <h1>{name}</h1>
            <h1>{email?.toString()}</h1>
          </div> */}
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
