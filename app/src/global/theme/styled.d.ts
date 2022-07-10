import 'styled-components';
import { CustomThemeProps } from './types';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomThemeProps {}
}
