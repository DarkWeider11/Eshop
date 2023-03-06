import {
  AppstoreAddOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  InputNumber,
  notification,
  Row,
  Select,
  Slider,
} from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { OnButton } from "../components/Buttons/Button";
import {
  productsApi,
  useFilterProductsQuery,
  useGetProductsQuery,
  useLazyFilterProductsQuery,
} from "../redux-toolkit/slices/productSlice";
import "../global.css";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
// import { addToCart } from "../redux-toolkit/slices/cartSlice";
import { store } from "../redux-toolkit/store/store";
import { addToCart } from "../redux-toolkit/slices/cartSlice";
import { createGlobalStyle } from "styled-components";

const contentStyle: React.CSSProperties = {
  maxWidth: "100%",
  color: "white",
  alignItems: "center",
};

function Products() {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputManufacturer, setInputManufacturer] = useState<string>("");
  const [inputPriceMin, setInputPriceMin] = useState<number>();
  const [inputPriceMax, setInputPriceMax] = useState<number>();
  const { data: products, error, isLoading } = useGetProductsQuery({});
  const { data: filteredProducts } = useFilterProductsQuery({
    name: inputValue,
    manufacturer: inputManufacturer,
    price_min: inputPriceMin,
    price_max: inputPriceMax,
  });

  const dispatch = useDispatch();
  const handleAddToCart = (id: number) => {
    console.log(id);
    const product = products?.find((el) => el.id === id);
    console.log(product);
    dispatch(addToCart(product));
    notification.success({
      message: "Product added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const [trigger, {}] = useLazyFilterProductsQuery({});

  const manufacturerOptions = [
    { key: "all-manufacturers", label: "-------", value: "" },
    ...(products
      ?.filter(
        (product, index, self) =>
          index ===
          self.findIndex((p) => p.manufacturer === product.manufacturer)
      )
      .map((product) => ({
        key: product.id,
        label: product.manufacturer,
        value: product.manufacturer,
      })) || []),
  ];

  const nameOptions = [
    { key: "all-products", label: "-------", value: "" },
    ...(products?.map((el) => ({
      key: el.id,
      label: el.name,
      value: el.name,
    })) || []),
  ];

  // const handlePriceChange = (value: number | undefined) => {
  //   setInputPrice(value ?? 0);
  // };

  const handlePriceMinChange = (value: number) => {
    if (typeof value === "number") {
      setInputPriceMin(value);
      if (filteredProducts) {
        const filtered = filteredProducts.filter(
          (product) => product.price >= value
        );
        // Utilizați rezultatul filtrării după preț în funcții sau componente ulterioare
      }
    }
  };

  const handlePriceMaxChange = (value: number) => {
    if (typeof value === "number") {
      setInputPriceMax(value);
      if (filteredProducts) {
        const filtered = filteredProducts.filter(
          (product) => product.price <= value
        );

        // Utilizați rezultatul filtrării după preț în funcții sau componente ulterioare
      }
    }
  };

  console.log(inputValue);
  // console.log(queryProducts);

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
            items={[
              { label: "Home Page", key: "/", icon: <HomeOutlined /> },
              { label: "Cart", key: "/cart", icon: <AppstoreAddOutlined /> },
            ]}
          ></Menu>
          <div style={{ height: "24px" }}></div>
          <Form
            layout="vertical"
            form={form}
            style={{
              maxWidth: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px",
              }}
            >
              {/* Select Name */}
              <Form.Item label="Name" name="name">
                <Select
                  placeholder="Name"
                  options={nameOptions}
                  onChange={(val) => setInputValue(val)}
                />
              </Form.Item>

              {/* Select Manufacturer */}
              <Form.Item
                label="Manufacturer"
                name="manufacturer"
                style={{ marginBottom: "1px" }}
              >
                <Select
                  placeholder="Manufacturer"
                  options={manufacturerOptions}
                  onChange={(val) => setInputManufacturer(val)}
                  mode="multiple" // add this line to enable multiple selections
                />
              </Form.Item>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              ></div>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
                style={{
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontWeight: "bold",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                  alignItems: "center",
                  display: "flex",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e: any) =>
                  (e.target.style.backgroundColor = "#40a9ff")
                }
                onMouseLeave={(e: any) =>
                  (e.target.style.backgroundColor = "#1890ff")
                }
              >
                Submit
              </Button>
            </div>
          </Form>
        </Sider>

        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "white", padding: 20, minHeight: 800 }}>
              <div className="products-container">
                {filteredProducts ? (
                  <>
                    <h2>Filtered Products</h2>
                    <div className="products">
                      {filteredProducts.map((el) => (
                        <div key={el.id} className="product">
                          <h3>{el.name}</h3>
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

                          <OnButton onClick={() => handleAddToCart(el.id)}>
                            Add to cart
                          </OnButton>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="products-container">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>error occurred..</p>
                ) : (
                  <></>
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

export { Products };
