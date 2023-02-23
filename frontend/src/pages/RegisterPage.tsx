import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUsersMutation } from "../redux-toolkit/slices/usersSlice";
const contentStyle: React.CSSProperties = {
  maxWidth: "300px",
  color: "white",
  margin: "0 auto",
};

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [registerUsers] = useRegisterUsersMutation();
  const onSubmit = async () => {
    const { password, confirm_password } = await form.validateFields();
    navigate("/");

    if (password === confirm_password) {
      registerUsers(form.getFieldsValue(true));
    } else {
      notification.error({
        message: "Error",
        description: "Password does not match",
        duration: 3,
      });
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 11 }}
        style={contentStyle}
        form={form}
        // onFinish={(val) => {
        //   console.log({ val });
        // }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email" },
            { type: "email", message: " Please enter a valid email" },
          ]}
          hasFeedback
        >
          <Input placeholder="type your email" />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            { required: true, message: "Please input your username" },
            { whitespace: true },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input placeholder="type your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password" },
            { whitespace: true },
            { min: 8, max: 16 },
            // {
            //   validator: (_, value) =>
            //     value && value.includes(" ")
            //       ? Promise.resolve()
            //       : Promise.reject("Password does not match criteria"),
            // },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="type your password" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="Confirm password"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input.Password placeholder="confirm your password" />
        </Form.Item>

        <Button block type="primary" htmlType="submit" onClick={onSubmit}>
          Register
        </Button>
      </Form>
    </div>
  );
};
export { Register };
