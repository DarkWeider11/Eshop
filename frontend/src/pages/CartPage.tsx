import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Avatar from "antd/es/avatar";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { OnButton } from "../components/Buttons/Button";
import { useAppSelector } from "../hooks/hooks";
import {
  addToCart,
  cartReducer,
  getTotals,
  removeFromCart,
} from "../redux-toolkit/slices/cartSlice";
import "../global.css";
import { useEffect } from "react";
import notification from "antd/es/notification";

function Cart() {
  const navigate = useNavigate();
  const { cart } = useAppSelector((s) => ({
    ...s,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart({ id }));
    notification.success({
      message: "Item removed from cart",
    });
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity({ id }));
  };

  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        <Avatar
          style={{ float: "right" }}
          shape="square"
          icon={<UserOutlined />}
        />
        <Title level={2} style={{ color: "white", textAlign: "left" }}>
          Cart
        </Title>
      </Header>
      <Layout>
        <Sider>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                label: "Product Page",
                key: "/products",
                icon: <AppstoreOutlined />,
              },
            ]}
          ></Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ background: "white", padding: 20, minHeight: 800 }}>
              <div className="cart-container">
                <h2>Cart</h2>
                {cart.cartItems.length === 0 ? (
                  <div className="cart-empty">
                    <p>Cart is empty</p>
                    <div className="start-shopping">
                      <Link to="/products">
                        <span>Start Shopping</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="titles">
                      <h3 className="product-title">Product</h3>
                      <h3 className="price">Price</h3>
                      <h3 className="quantity">Quantity</h3>
                      <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                      {cart.cartItems?.map((cartItems) => (
                        <div className="cart-item" key={cartItems.id}>
                          <div className="cart-product">
                            {cartItems.images?.length ? (
                              cartItems.images.map(({ images, name }) => {
                                if (images) {
                                  return <img src={images} alt={name} />;
                                } else {
                                  return null;
                                }
                              })
                            ) : (
                              <p>No Image</p>
                            )}
                            <div>
                              <h3>{cartItems.name}</h3>
                              <OnButton
                                type="primary"
                                onClick={() =>
                                  handleRemoveFromCart(cartItems.id)
                                }
                              >
                                Remove
                              </OnButton>
                            </div>
                          </div>
                          <div className="cart-product-price">
                            ${cartItems.price}
                          </div>
                          <div className="cart-product-quantity">
                            <div className="count">
                              {cartItems.cartQuantity}
                            </div>
<<<<<<< HEAD
                            <button
                              onClick={() => handleIncrement(cartItems.id)}
                            >
                              +
                            </button>
=======
>>>>>>> 6a3ce23de72e79a2701836f1ad3abca5c7819827
                          </div>
                          <div className="cart-product-total-price">
                            ${cartItems.price * cartItems.cartQuantity}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary">
                      <button className="clear-cart">Clear cart</button>
                      <div className="cart-checkout">
                        <div className="subtotal">
                          <span>Subtotal</span>
                          <span className="amount">
                            ${cart.cartTotalAmount}
                            <p>Taxes calculated</p>
                            <OnButton>Check out</OnButton>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Eshop</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export { Cart };
function incrementQuantity(arg0: { id: any }): any {
  throw new Error("Function not implemented.");
}
