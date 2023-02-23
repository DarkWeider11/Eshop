import { Button } from "antd";
import styled from "styled-components";

export interface IButtonInterface {
  width?: number | string;
  background?: string;
  shape?: "defaut" | "circle" | "round";
  height?: number | string;
  position?: "relative";
  justifyContent?: "right" | "left";
  padding?: number | string;
  textAlign?: "center" | "right" | "left";
  borderRadius?: number | string;
}

export const StyledButton = styled(Button)(
  ({ styles }: { styles: IButtonInterface }) => ({ ...styles })
);
