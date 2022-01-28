import 'styled-components';

export type Palette = {};

export default interface ThemeInterface {
  palette: Palette;

  units: {
    none: number;
    half: number;
    base: number;
    double: number;
  };
}
