import { Box } from "../Box/Box";
import { Bar } from "../Bar/Bar";

export function ProductsHeader() {
  return (
    <Box display="flex" justifyContent="space-between">
      {" "}
      <Bar />
    </Box>
  );
}
