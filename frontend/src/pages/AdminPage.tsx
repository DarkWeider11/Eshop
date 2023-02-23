import { ReactNode } from "react";
import { Avatar, Breadcrumb, Layout, Menu, Space } from "antd";
import Title from "antd/es/typography/Title";
import Icon, {
  ApiOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { useNavigate } from "react-router-dom";
import { OnButton } from "../components/Buttons/Button";
import { logout } from "../redux-toolkit/slices/usersSlice";

const { Header, Footer, Sider, Content } = Layout;

function Admin() {
  const navigate = useNavigate();
  const handlelogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar
            style={{ float: "right" }}
            shape="square"
            icon={<UserOutlined />}
          />
          <Title level={2} style={{ color: "white", textAlign: "left" }}>
            Eshop
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              onClick={({ key }) => {
                navigate(key);
              }}
              items={[
                { label: "Home Page", key: "/", icon: <HomeOutlined /> },
                {
                  label: "Electronics",
                  key: "/ produs",
                  icon: <ApiOutlined />,
                },
                {
                  label: "Logout",
                  key: "logout",
                  icon: <LoginOutlined />,
                  danger: true,
                  onClick: handlelogout,
                },
              ]}
            ></Menu>
          </Sider>

          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "white", padding: 20, minHeight: 800 }}>
                Content
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Eshop</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
export { Admin };
function dispatch(arg0: { payload: undefined; type: "users/logout" }) {
  throw new Error("Function not implemented.");
}
