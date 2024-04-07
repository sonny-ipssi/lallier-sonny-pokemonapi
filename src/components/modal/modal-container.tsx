import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { styleVars } from 'globalStyles';

const ModalContainer = styled(motion.div)({
  background: styleVars.darkBlue,
  minWidth: '500px',
  marginTop: '6em',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export default ModalContainer;
