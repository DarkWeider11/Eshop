import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
} from "antd";
import { useEffect, useState } from "react";
import {
  useFilterProductsQuery,
  useGetProductsQuery,
} from "../../redux-toolkit/slices/productSlice";
const contentStyle: React.CSSProperties = {
  maxWidth: "100%",
  color: "white",
  alignItems: "center",
};

export function Filters() {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState<string>("");
  //   const onChange = (newValue: number) => {
  //     setInputValue(newValue);
  //   };

  const { data: products, error, isLoading } = useGetProductsQuery({});

  const { data: queryProducts } = useFilterProductsQuery({
    query: inputValue,
  });

  const numeOptions = products?.map((el) => {
    return {
      key: el.id,
      label: el.nume,
      value: el.nume,
    };
  });

  console.log(inputValue);
  console.log(queryProducts);

  return (
    <Form style={contentStyle} layout="horizontal" form={form}>
      <Form.Item label="nume" name="nume">
        <Select
          placeholder="Name"
          options={numeOptions}
          onChange={(val) => setInputValue(val)}
        />
      </Form.Item>
      <Form.Item label="Manufacturer" name="manufacturer">
        <Select placeholder="Manufacturer" />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
