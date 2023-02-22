import styled from "styled-components";
import { Input, InputProps } from "antd";
import { SearchProps } from "antd/es/input";
export interface ISearchInterface {
  width?: number | string;
  height?: number | string;
  justifyContent?: "right" | "left" | "space-between" | "center";
  gap?: number;
}

export const StyledSearch = styled(Input.Search)(
  ({ style }: { style: ISearchInterface }) => ({ ...style })
);
