import React from "react";
import { EmptyState } from "@shopify/polaris";

const EmptyStateComponent = ({ heading, title }) => {
  return (
    <EmptyState
      heading={heading}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>{title}</p>
    </EmptyState>
  );
};

export default EmptyStateComponent;
