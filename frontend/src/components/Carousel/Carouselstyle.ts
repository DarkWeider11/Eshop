import styled from "styled-components";
import { Carousel } from "antd";

export interface ICarouselInterface {
  height?: number | string;
  background?: string;
  lineHeight?: number | string;
  textAlign?: "center";
  color?: string;
  padding?: number | string;
  margin?: number | string;
  borderRadius?: number | string;
  borderColor?: string;
  display?: "flex" | "block" | "inline-block";
  contentStyle?: number | string;
  borderStyle?: string;
  width?: string | number;
  alignSelf?: "center" | "start" | "end";
  maxWidth?: string | number;
}

export const StyledCarousel = styled(Carousel)(
  ({ style }: { style: ICarouselInterface }) => ({ ...style })
);
