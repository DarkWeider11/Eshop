import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { Box } from "../Box/Box";
import { OnButton } from "../Buttons/Button";
import { Sitemap } from "../Sitemap/Sitemap";

const items = [
  {
    key: "1",
    icon: <i className="fa fa-envelope"></i>,
    title: "Email",
    content: <OnButton>email: Eshop@gmail.com</OnButton>,
  },
  {
    key: "2",
    icon: <i className="fa fa-envelope"></i>,
    title: "Numărul de telefon",
    content: <OnButton>068878721</OnButton>,
  },
  {
    key: "3",
    icon: <i className="fa fa-envelope"></i>,
    title: "Folow us",
    content: <OnButton>Facebook</OnButton>,
  },
];

export function Footer() {
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
      {/* <Box padding={10}>
        <h2>Other Referencies</h2>
        <Box>
          <a href="https://www.orange.md/" target="_blank">
            <OnButton>Orange.MD</OnButton>
          </a>
        </Box>

        <Box padding={10}>
          <h2>Social Media</h2>
        </Box>
        <Box padding="10px" display="flex" textAlign="center" gap={10}>
          <a href="https://www.instagram.com/orange/" target="_blank">
            <OnButton width={40} height={40} borderRadius={10}>
              <InstagramOutlined />
            </OnButton>
          </a>
          <a href="https://www.facebook.com/Orange.Moldova" target="_blank">
            <OnButton width={40} height={40} borderRadius={10}>
              <FacebookOutlined />
            </OnButton>
          </a>
        </Box>
      </Box> */}
    </>
  );
}
