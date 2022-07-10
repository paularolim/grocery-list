import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: red;
  background-color: ${({ theme }) => theme.tertiary};
  padding: 30px;
`;
