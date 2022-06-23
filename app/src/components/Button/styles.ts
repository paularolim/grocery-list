import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../Text";

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.primary};
  padding: 10px 0px;
  border-radius: 15px;
  margin-bottom: 40px;
  align-items: center;
`;

export const Label = styled(Text).attrs({
  h4: true,
  h4Style: {
    fontWeight: "400",
  },
})`
  color: ${({ theme }) => theme.tertiary};
`;
