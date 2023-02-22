import { Link } from "react-router-dom";
import { Box } from "../Box/Box";
import { OnButton } from "../Buttons/Button";
import { StyledPhonenumber } from "../Phonenumber/Phonenumber";

export function Language() {
  return (
    <Box display="flex" gap={8} justifyContent="right">
      <Box>
        <OnButton>Cart</OnButton>{" "}
      </Box>
      <Box>
        <OnButton>EN</OnButton> <OnButton>RU</OnButton>
      </Box>
    </Box>
  );
}
