import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  maxWidth: "300px",
  color: "white",
  justifyContent: "center",
  alignSelf: "center",
  alignContent: "center",
  margin: "0 auto",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSubmit = () => {
    navigate("/login");
  };

  return (
    <div>
      <Form style={contentStyle} form={form}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username" }]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email address"
            required
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            // htmlType="submit"
            onClick={onSubmit}
            className="login-form-button"
          >
            Send email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export { ResetPassword };
