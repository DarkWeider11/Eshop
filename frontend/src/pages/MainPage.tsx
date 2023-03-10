import {
  AndroidOutlined,
  AppleOutlined,
  CustomerServiceOutlined,
  DesktopOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "../components/Bar/Bar";
import { Box } from "../components/Box/Box";
import { OnButton } from "../components/Buttons/Button";
import { Carousel } from "../components/Carousel/Carousel";
// import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Image } from "../components/Image/Image";
import { Sitemap } from "../components/Sitemap/Sitemap";
import { useGetProductsQuery } from "../redux-toolkit/slices/productSlice";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "white",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  justifyContent: "right, left",
  borderRadius: "6px",
};

export function MainPage() {
  const navigate = useNavigate();

  const { data: products, error, isLoading } = useGetProductsQuery({});
  return (
    <Layout>
      <Box display="flex" flexDirection="column" maxWidth="100%">
        <Box>
          <Header />
        </Box>
        <Box display="flex" alignSelf="center" maxWidth="100%">
          <Bar />
        </Box>
        <Box>
          <Carousel
            autoplay={true}
            height={500}
            // width={1500}
            textAlign="center"
            background="#364d79"
            margin={115}
            borderRadius={6}
            borderColor="#d9d9d9"
            display="flex"
            borderStyle="solid"
            alignSelf="center"
            justifyContent="center"
            maxWidth="100%"
          >
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/asus.webp"
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/watch.webp"
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/samsung.webp"
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/macbook.webp"
                  height={650}
                  width={1540}
                ></Image>
              </a>
            </div>
          </Carousel>
        </Box>

        <div className="products-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>error occurred..</p>
          ) : (
            <>
              <h2>New Arrivals</h2>
              <div className="products">
                {products?.slice(0, 4).map((el) => (
                  <div key={el.id} className="product">
                    <h3>{el.name}</h3>
                    {el.images?.length ? (
                      el.images.map(({ image, id, produs }) => {
                        if (image) {
                          return <img key={id} src={image} alt={produs} />;
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
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Box>
          <Carousel
            height={500}
            // width={1500}
            textAlign="center"
            background="#364d79"
            margin={115}
            borderRadius={6}
            borderColor="#d9d9d9"
            display="flex"
            borderStyle="solid"
            alignSelf="center"
            justifyContent="center"
            maxWidth="100%"
          >
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/s23.webp"
                  // height={450}
                  // width={1540}
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/ipad.webp"
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/pod.webp"
                  height={650}
                  max-width="100%"
                ></Image>
              </a>
            </div>
            <div>
              <a href="https://darwin.md/realme-8-black-6-128-gb-dual.html">
                <Image
                  preview={false}
                  src="./src/assets/images/air.webp"
                  height={650}
                  width={1690}
                ></Image>
              </a>
            </div>
          </Carousel>
        </Box>

        <Box display="flex" gap={28} alignSelf="center" marginLeft={32}>
          <OnButton width={86} height={86} shape="circle">
            <AppleOutlined
              style={{ fontSize: 50, color: "gray" }}
              key="/products"
            />
          </OnButton>
          <OnButton width={86} height={86} shape="circle">
            <AndroidOutlined
              style={{ fontSize: 50, color: "gray", alignItems: "center" }}
            />
          </OnButton>
          <OnButton width={86} height={86} shape="circle">
            <LaptopOutlined
              style={{ fontSize: 50, color: "gray", alignItems: "center" }}
            />
          </OnButton>
          <OnButton width={86} height={86} shape="circle">
            <CustomerServiceOutlined
              style={{ fontSize: 50, color: "gray", alignItems: "center" }}
            />
          </OnButton>
          <OnButton width={86} height={86} shape="circle">
            <DesktopOutlined
              style={{ fontSize: 50, color: "gray", alignItems: "center" }}
            />
          </OnButton>
        </Box>

        {/* <Box
          display="flex"
          gap={5}
          borderStyle="solid"
          borderColor="#d9d9d9"
          padding={64}
          borderRadius={6}
          margin={32}
        >
          <Footer></Footer>
          <Sitemap></Sitemap>
        </Box> */}
      </Box>
      <Footer style={{ textAlign: "center" }}>Eshop</Footer>
    </Layout>
  );
}
