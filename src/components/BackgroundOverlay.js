import styled from 'styled-components';
import { rgba } from 'polished';
import { animated } from 'react-spring';

import { media } from './theme';

const BackgroundOverlay = styled(animated.div)`
  display: none;
  ${media.break`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => rgba(theme.dark, 0.64)};
    display: block;
    top: 0;
    left: 0;
    mix-blend-mode: multiply;
    z-index: 4;
  `}
`;

export default BackgroundOverlay;
