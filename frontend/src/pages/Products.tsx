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
  const [InputManufacturer, setInputManufacturer] = useState<string>("");
  const { data: products, error, isLoading } = useGetProductsQuery({});
  const [inValue, setInValue] = useState(1);
  // const [filteredProducts, setFilteredProducts] = useState(null);
  const { data: filteredProducts } = useFilterProductsQuery({
    query: inputValue,
    manufacturer: InputManufacturer,
    price: inValue,
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
  // const { data: queryProducts } = useFilterProductsQuery({
  //   query: inputValue,
  //   manufacturer: InputManufacturer,
  // });

  const [trigger, {}] = useLazyFilterProductsQuery({
    // query: inputValue,
    // manufacturer: InputManufacturer,
  });

  const manufacturerOptions = products
    ?.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.manufacturer === product.manufacturer)
    )
    .map((product) => ({
      key: product.id,
      label: product.manufacturer,
      value: product.manufacturer,
    }));

  const nameOptions = products?.map((el) => {
    return {
      key: el.id,
      label: el.name,
      value: el.name,
    };
  });

  const onChange = (newValue: number) => {
    setInValue(newValue);
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
        </Sider>

        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Form style={contentStyle} layout="horizontal" form={form}>
              <Form.Item label="Name" name="name">
                <Select
                  placeholder="Name"
                  options={nameOptions}
                  onChange={(val) => setInputValue(val)}
                />
              </Form.Item>
              <Form.Item label="Manufacturer" name="manufacturer">
                <Select
                  placeholder="Manufacturer"
                  options={manufacturerOptions}
                  onChange={(val) => setInputManufacturer(val)}
                />
              </Form.Item>

              <Form.Item label="Price" name="price"></Form.Item>

              <Row>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={3000}
                    onChange={onChange}
                    value={typeof inValue === "number" ? inValue : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber style={{ margin: "0 16px" }} value={inValue} />
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => trigger({ query: inputValue })}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
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
                  <>
                    {/* <h2>Products</h2>
                    <div className="products">
                      {products?.map((el) => (
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
                          <OnButton onClick={handleAddToCart}>
                            Add to cart
                          </OnButton>
                        </div>
                      ))}
                    </div> */}
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

export { Products };
