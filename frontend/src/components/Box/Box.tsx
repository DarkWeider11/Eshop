import React, { ReactNode } from "react";
import { IBoxInterface, StyledBox } from "./Boxstyle";

interface BoxProps extends IBoxInterface {
  children?: ReactNode;
}

// export const Box = ({ children, backgroundImage, ...rest }: BoxProps) => {
//   return (
//     <StyledBox styles={rest} backgroundImage={backgroundImage}>
//       {children}
//     </StyledBox>
//   );
// };
export function Box({ children, backgroundImage, ...rest }: BoxProps) {
  return <StyledBox styles={rest}>{children}</StyledBox>;
}
