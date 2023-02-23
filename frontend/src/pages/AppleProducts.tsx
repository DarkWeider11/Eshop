import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "../components/Box/Box";
import { OnButton } from "../components/Buttons/Button";
import {
  productsApi,
  useGetProductsQuery,
} from "../redux-toolkit/slices/productSlice";
import "../global.css";
import Title from "antd/es/typography/Title";

function AppleProducts() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const navigate = useNavigate();
  return (
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
            items={[{ label: "Home Page", key: "/", icon: <HomeOutlined /> }]}
          ></Menu>
        </Sider>

        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "white", padding: 20, minHeight: 800 }}>
              <div className="products-container">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>error occurred..</p>
                ) : (
                  <>
                    <h2>Products</h2>
                    <div className="products">
                      {products?.map((el) => (
                        <div key={el.id} className="product">
                          <h3>{el.nume}</h3>
                          {el.images?.length ? (
                            el.images.map(({ image, id, produs }) => {
                              if (image) {
                                return (
                                  <img key={id} src={image} alt={produs} />
                                );
                              } else {
                                return null;
                              }
                            })
                          ) : (
                            <p>No Image</p>
                          )}
                          <div className="details">
                            <span>{el.product_description}</span>
                            <span className="price">${el.price}</span>
                          </div>
                          <OnButton>Add to cart</OnButton>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Eshop</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export { AppleProducts };
