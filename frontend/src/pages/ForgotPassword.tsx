import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const contentStyle: React.CSSProperties = {
  maxWidth: "300px",
  color: "white",
  justifyContent: "center",
  alignSelf: "center",
  alignContent: "center",
  margin: "0 auto",
};

const Forgot = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSubmit = () => {
    navigate("/login");
  };

  return (
    <div>
      <Form style={contentStyle} form={form}>
        <Form.Item
          name="old_password"
          rules={[
            { required: true, message: "Please input your old password" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Old password"
            required
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="new_password"
          rules={[
            { required: true, message: "Please input your new password" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="New password"
            required
          ></Input.Password>
        </Form.Item>
        <Form.Item
          name="confirm_new_password"
          rules={[
            { required: true, message: "Please confirm your new password" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm password"
            required
          ></Input.Password>
        </Form.Item>
        <Button block type="primary" htmlType="submit" onClick={onSubmit}>
          Confirm
        </Button>
      </Form>
    </div>
  );
};
export { Forgot };
