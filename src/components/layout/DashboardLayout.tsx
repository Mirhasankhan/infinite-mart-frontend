import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import DashboardHeader from "./DashboardHeader";

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout>
      <Sidebar></Sidebar>
      <Layout>
        <DashboardHeader></DashboardHeader>
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
