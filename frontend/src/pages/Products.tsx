import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Select } from "antd";
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
import { Filters } from "../components/Filters/Filter";
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

  // const { data: queryProducts } = useFilterProductsQuery({
  //   query: inputValue,
  //   manufacturer: InputManufacturer,
  // });

  const [trigger, {}] = useLazyFilterProductsQuery({
    // query: inputValue,
    // manufacturer: InputManufacturer,
  });

  const manufacturerOptions = [
    { key: 1, label: "Apple", value: "Apple" },
    { key: 2, label: "Samsung", value: "Samsung" },
  ];

  const numeOptions = products?.map((el) => {
    return {
      key: el.id,
      label: el.nume,
      value: el.nume,
    };
  });

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
            items={[{ label: "Home Page", key: "/", icon: <HomeOutlined /> }]}
          ></Menu>
        </Sider>

        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Form style={contentStyle} layout="horizontal" form={form}>
              <Form.Item label="nume" name="nume">
                <Select
                  placeholder="Name"
                  options={numeOptions}
                  onChange={(val) => setInputValue(val)}
                />
              </Form.Item>
              <Form.Item label="Manufacturer" name="manufacturer">
                <Select
                  placeholder="Manufacturer"
                  options={manufacturerOptions}
                  onChange={(val) => setInputManufacturer(val)}
                />

                {/* <Option value="manufacturer">Apple</Option>
          <Option value="manufacturer">Samsung</Option>
          <Option value="manufacturer">Xiaomi</Option> */}
                {/* </Select> */}
              </Form.Item>

              <Form.Item label="Price" name="price"></Form.Item>

              {/* <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={3000}
            onChange={onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            style={{ margin: "0 16px" }}
            value={inputValue}
          />
        </Col>
      </Row> */}
              {/* <Row>
        <Form.Item label="from" name="from" labelCol={{ span: 7 }}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="to" name="to" labelCol={{ span: 5 }}>
          <InputNumber />
        </Form.Item>
      </Row> */}
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

export { Products };
