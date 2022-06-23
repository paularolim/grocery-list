import React from "react";
import { Text as RNEText } from "react-native-elements";
import { TextProps } from "./types";

export const Text = ({ children, ...rest }: TextProps) => (
  <RNEText {...rest}>{children}</RNEText>
);
