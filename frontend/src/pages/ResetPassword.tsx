import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux-toolkit/slices/usersSlice";
import axios from "axios";

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

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async () => {
    navigate("/login");
    try {
      const values = await form.validateFields();
      const username = values.username;
      await resetPassword({ username });

      // Send reset password email using Mailtrap.io
      const response = await axios.post(
        "sandbox.smtp.mailtrap.io",
        {
          recipient: username,
          subject: "Reset Password",
        },
        {
          auth: {
            username: "ec76d91a7542c4", // Replace with your Mailtrap username
            password: "09b54b6c58695c", // Replace with your Mailtrap password
          },
        }
      );

      console.log(response);
      // navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form style={contentStyle} form={form}>
        <Form.Item
          name="username"
          label="Email address"
          rules={[
            { required: true, message: "Please input your email address" },
          ]}
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
            htmlType="submit"
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
