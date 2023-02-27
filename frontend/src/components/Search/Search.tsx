import React, { ReactNode } from "react";
import { Input, Space } from "antd";
import { ISearchInterface, StyledSearch } from "./Searchstyle";

// const { Search } = Input;
interface ISearchProps extends ISearchInterface {
  enterButton?: ReactNode;
}

export const Search = ({ enterButton, ...rest }: ISearchProps) => {
  return <StyledSearch style={rest} enterButton={enterButton} />;
};
