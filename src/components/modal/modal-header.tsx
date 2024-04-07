import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { styleVars } from 'globalStyles';

const ModalHeader = styled(motion.div)({
  width: '100%',
  marginBottom: '1.5em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const CloseButton = styled.button({
  color: styleVars.lightBlue,
  backgroundColor: 'transparent',
  border: 0,
  padding: 0,
  margin: 0,
});

export { CloseButton, ModalHeader };
