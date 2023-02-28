// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../redux-toolkit/slices/usersSlice";
// import axios from "axios";

// const contentStyle: React.CSSProperties = {
//   maxWidth: "300px",
//   color: "white",
//   justifyContent: "center",
//   alignSelf: "center",
//   alignContent: "center",
//   margin: "0 auto",
// };

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const [resetPassword] = useResetPasswordMutation();

//   const onSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       const email = values.email;
//       await resetPassword({ email });
//       setEmail(email);

//       // Send reset password email using Mailtrap.io
//       const response = await axios.post(
//         "https://mailtrap.io/inboxes/2112916/messages",
//         {
//           recipient: email,
//           subject: "Reset Password",
//         },
//         {
//           auth: {
//             username: "OrangeOSY", // Replace with your Mailtrap username
//             password: "orangeOSY2023", // Replace with your Mailtrap password
//           },
//         }
//       );

//       console.log(response);
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Form style={contentStyle} form={form}>
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: "Please input your username" }]}
//           hasFeedback
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Email address"
//             required
//           ></Input>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             block
//             type="primary"
//             // htmlType="submit"
//             onClick={onSubmit}
//             className="login-form-button"
//           >
//             Send email
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
// export { ResetPassword };
// function setEmail(email: any) {
//   throw new Error("Function not implemented.");
// }
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
    try {
      const values = await form.validateFields();
      const email = values.email;
      await resetPassword({ email });

      // Send reset password email using Mailtrap.io
      const response = await axios.post(
        "sandbox.smtp.mailtrap.io",
        {
          recipient: email,
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
      navigate("/login");
    } catch (error) {
      console.error(error);
      form.setFields([
        {
          name: "email",
          errors: ["An error occurred. Please try again."],
        },
      ]);
    }
  };

  return (
    <div>
      <Form style={contentStyle} form={form}>
        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: "Please input your email address" }]}
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
