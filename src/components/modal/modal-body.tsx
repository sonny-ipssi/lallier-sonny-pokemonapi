import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ModalBody = styled(motion.div)({
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
});

export default ModalBody;
