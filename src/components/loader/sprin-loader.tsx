import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { TbLoader3 } from 'react-icons/tb';

const rotateAnimation = keyframes({
  to: {
    transform: 'rotate(0deg)',
  },
  from: {
    transform: 'rotate(360deg)',
  },
});
const Loader = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  animation: `${rotateAnimation} 0.75s both reverse infinite linear`,
});

const SpinLoader = ({ style }: { style?: CSSProperties }) => (
  <Loader style={style}>
    <TbLoader3
      size={48}
      color='#fff'
    />
  </Loader>
);

export default SpinLoader;
