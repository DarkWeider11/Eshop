import React, { ReactNode } from "react";
import { IButtonInterface, StyledButton } from "./Buttonstyle";

interface ButtonProps extends IButtonInterface {
  children?: ReactNode;
  shape?: "circle";
  href?: string;
  position?: "relative";
  onClick?: () => void;
}

export const OnButton = ({
  children,
  shape,
  href,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton styles={rest} shape={shape} href={href} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

// export function OnButton({ children, shape, ...rest }: ButtonProps) {
//   return <StyledButton styles={rest}>{children}</StyledButton>;
// }
