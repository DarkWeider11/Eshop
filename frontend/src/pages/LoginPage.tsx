import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { OnButton } from "../components/Buttons/Button";
import {
  useLoginUsersMutation,
  // useGetUsersQuery,
  // useLazyGetUsersQuery,
} from "../redux-toolkit/slices/usersSlice";

const contentStyle: React.CSSProperties = {
  maxWidth: "300px",
  color: "white",
  justifyContent: "center",
  alignSelf: "center",
  alignContent: "center",
  margin: "0 auto",
};
const loginforgot: React.CSSProperties = {
  float: "right",
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loginUsers, { data: loginUserData }] = useLoginUsersMutation();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { email, username, password } = values;

      const result = await loginUsers({
        email,
        password,
        user_id: 0,
        username,
        access_token: "",
        success: undefined,
        loginStatus: false,
      }).unwrap();

      console.log(result);
      console.log(loginUserData);

      if (result && result.success === true) {
        notification.error({
          message: "Login failed",
          description: "The entered email and password are incorrect.",
        });
        // navigate("/");
      } else {
        // notification.error({
        //   message: "Login failed",
        //   description: "The entered email and password are incorrect.",
        notification.success({
          message: "Login successfuly",
          description: "The entered email and password are correct.",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <OnButton onClick={getUsers}>Click</OnButton> */}
      {/* <OnButton onClick={() => trigger()}>Click</OnButton> */}
      <Form style={contentStyle} form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email address or username"
            required
          ></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            required
          ></Input.Password>
        </Form.Item>
        <Form.Item>
          <Link to="/reset">Reset Password</Link>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            // htmlType="submit"
            onClick={onSubmit}
            className="login-form-button"
          >
            Log In{" "}
          </Button>
          Or <Link to="/register">Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export { Login };
