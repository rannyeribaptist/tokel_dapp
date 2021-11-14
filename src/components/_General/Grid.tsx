import styled from '@emotion/styled';
import { Responsive } from 'util/helpers';

type GRID = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const Column = styled.div<{ size?: GRID | 'narrow'; offset?: GRID; vertical?: boolean }>`
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: ${props => props.theme.grid.columnGap};

  ${Responsive.above.L} {
    width: ${props =>
      !!props.size && (props.size !== 'narrow' ? `${(props.size / 12) * 100}%` : 'unset')};

    ${props => !!props.size && `flex: none;`};
  }

  ${props =>
    props.vertical &&
    `
        display: flex;
        flex-direction: column;
      `}

  ${props => !!props.offset && `margin-left: ${(props.offset / 12) * 100}%`};
`;

const Columns = styled.div<{
  mobile?: boolean;
  centered?: boolean;
  gapless?: boolean;
  multiline?: boolean;
  vcentered?: boolean;
}>`
  margin-right: calc(${props => props.theme.grid.columnGap} * -1);
  margin-left: calc(${props => props.theme.grid.columnGap} * -1);
  margin-top: calc(${props => props.theme.grid.columnGap} * -1);

  &:not(:last-child) {
    margin-bottom: calc(1.5rem - ${props => props.theme.grid.columnGap});
  }

  ${props => props.centered && `justify-content: center;`}
  ${props => props.multiline && `flex-wrap: wrap;`}
  ${props => props.vcentered && `align-items: center;`}
  ${props => props.mobile && `display: flex;`}

  ${props =>
    props.gapless &&
    `
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }

    &:last-child {
      margin-bottom: 0;
    }

    ${Column} {
      margin: 0;
      padding: 0 !important;
    }
  `}

  ${Responsive.above.L} {
    display: flex;
  }
`;

export { Columns, Column };
