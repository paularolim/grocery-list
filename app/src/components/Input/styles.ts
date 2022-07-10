import { TextInput } from 'react-native';
import styled from 'styled-components/native';

export const StyledInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 15px;
  padding: 10px 15px;
  margin-bottom: 30px;
  font-size: 16px;
`;
