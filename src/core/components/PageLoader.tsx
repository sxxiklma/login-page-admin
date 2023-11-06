import { Spin } from "antd";
import { ReactNodeArray } from "prop-types";
import React, { ReactNode } from "react";

interface PageLoaderProps {
  children: React.ReactNode;
  loading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children, loading }) => {
  //   const  = props;

  return loading ? (
    <div className="ml-[50%] mt-[calc(30%)]">
      <Spin size="large" />
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default PageLoader;
