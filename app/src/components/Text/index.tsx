import React from 'react';
import { Text as RNEText } from 'react-native-elements';
import { TextProps } from './types';

export function Text({ children, ...rest }: TextProps) {
  return <RNEText {...rest}>{children}</RNEText>;
}
