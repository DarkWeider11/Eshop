import { Box } from "../Box/Box";
import { OnButton } from "../Buttons/Button";
import { StyledPhonenumber } from "../Phonenumber/Phonenumber";
import { Col, Row } from "antd";

import { InstagramOutlined, FacebookOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    icon: <i className="fa fa-envelope"></i>,
    title: "Order now",
    content: <OnButton>email: Eshop@gmail.com</OnButton>,
  },
  {
    key: "2",
    icon: <i className="fa fa-envelope"></i>,
    title: "ADVERTISING",
    content: <OnButton>068878222</OnButton>,
  },
  {
    key: "3",
    icon: <i className="fa fa-envelope"></i>,
    title: "Information",
    content: <OnButton>email: infoEshop@gmail.com</OnButton>,
  },
];
export function Sitemap() {
  return (
    <>
      <Row gutter={[16, 16]}>
        {items.map((item) => {
          return (
            <Col span={10} key={item.key}>
              <div className="content">
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </>

    // <Box padding={10} flexDirection="row">
    //   <Box justifyContent="right">
    //     <Box font-family="Arial">
    //       <h2>Contacts Us</h2>{" "}
    //     </Box>
    //     <OnButton>
    //       <StyledPhonenumber href="tel:+373022844444">
    //         {" "}
    //         0228 444 44
    //       </StyledPhonenumber>
    //     </OnButton>
    //     <Box>
    //       <OnButton>
    //         {" "}
    //         <StyledPhonenumber href="tel:069603066">
    //           {" "}
    //           069 603 066
    //         </StyledPhonenumber>
    //       </OnButton>

    //       <p></p>
    //     </Box>
    //   </Box>
    //   <Box justifyContent="right" flexDirection="row">
    //     <h2> Email:</h2>
    //     <a href="https://mail.google.com" target="_blank">
    //       {" "}
    //       <OnButton>boreagolis@gmail.com</OnButton>
    //     </a>
    //     <a href="https://mail.google.com" target="_blank">
    //       {" "}
    //       <OnButton>cucudaniel@gmail.com</OnButton>
    //     </a>
    //     <a href="https://mail.google.com" target="_blank">
    //       {" "}
    //       <OnButton>rusucatalin@gmail.com</OnButton>
    //     </a>
    //   </Box>
    // </Box>
  );
}
