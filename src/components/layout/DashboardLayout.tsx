import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout className="px-14">
      <Sidebar></Sidebar>
      <Layout>
        {/* <Header style={{ padding: 0 }} /> */}
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
