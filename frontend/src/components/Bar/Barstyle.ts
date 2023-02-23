import styled from "styled-components";
export interface IBarInterface {
  width?: number | string;
  background?: string;
  display?: "flex" | "block";
  marginRight?: number | string;
  marginLeft?: number | string;
  gap?: number;
  textAlign?: "right";
  justifyContent?: "right";
}

export const StyledBar = styled.div(({ styles }: { styles: IBarInterface }) => {
  return { ...styles };
});
