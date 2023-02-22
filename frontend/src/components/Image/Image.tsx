import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { IImageInterface, StyledImage } from "./Image";

interface ImageProps extends IImageInterface {
  children?: ReactNode;
  preview?: boolean;
  borderRadius?: number | string;
}

export const Image = ({ children, preview, ...rest }: ImageProps) => {
  return (
    <StyledImage style={rest} preview={preview}>
      {children}
    </StyledImage>
  );
};

// <div>
//   {/* 👇️ react router link */}
//   <Link to="/about">
//     <img src="/images/thumbnail.webp" alt="example" />
//   </Link>
