import React, { ReactNode, Ref, useRef } from "react";
import { ICarouselInterface, StyledCarousel } from "./Carouselstyle";

interface ICarouselProps extends ICarouselInterface {
  children?: ReactNode;
  autoplay?: boolean;
  dots?: boolean;
}

export const Carousel = ({
  dots,
  autoplay,
  children,
  ...rest
}: ICarouselProps) => {
  return (
    <StyledCarousel style={rest} autoplay={autoplay} dots={dots}>
      {children}
    </StyledCarousel>
  );
};
