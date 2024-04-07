import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { styleVars } from 'globalStyles';

const ModalWrapper = styled(motion.div)({
  zIndex: 9,
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  background: styleVars.darkBlack,
  backdropFilter: 'blur(0.25em)',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export default ModalWrapper;
