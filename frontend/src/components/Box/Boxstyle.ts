import styled from "styled-components";
export interface IBoxInterface {
  width?: number | string;
  background?: string;
  display?: "flex" | "block" | "inline-block";
  marginRight?: number | string;
  marginLeft?: number | string;
  gap?: number;
  textAlign?: "right" | "center";
  justifyContent?: "right" | "left" | "space-between" | "center";
  flexDirection?: "column" | "row";
  alignSelf?: "center" | "start" | "end";
  backgroundImage?: "string";
  padding?: number | string;
  borderStyle?: string;
  borderRadius?: number | string;
  margin?: number | string;
  borderColor?: string;
}

export const StyledBox = styled.div(
  ({ styles }: { styles: IBoxInterface }) => ({ ...styles })
);
