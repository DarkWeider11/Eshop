import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../redux-toolkit/slices/usersSlice";
import { Box } from "../Box/Box";
import { OnButton } from "../Buttons/Button";

export function LoginRegister() {
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    dispatch(logout());
  };

  return (
    <Box display="flex" gap={8} justifyContent="left">
      <Box>
        <OnButton>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </OnButton>
      </Box>
      <Box>
        <OnButton>
          <Link to="/login">
            <LoginOutlined />
          </Link>
        </OnButton>
      </Box>
      <Box>
        <OnButton>
          <Link to="/register">
            <UserAddOutlined />
          </Link>
        </OnButton>
      </Box>
      <Box>
        <OnButton onClick={handlelogout}>
          <LogoutOutlined />
        </OnButton>
      </Box>
    </Box>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
