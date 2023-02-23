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

// const App: React.FC = () => (
//   <Space direction="vertical">
//     <Search placeholder="input search text" />
//   </Space>
// );

// export { Search };

// interface SearchProps extends ISearchInterface {
//   children: ReactNode;
// }

// export function Search({ children, ...rest }: SearchProps) {
//   return <StyledSearch styles={rest}>{children}</StyledSearch>;
// }
