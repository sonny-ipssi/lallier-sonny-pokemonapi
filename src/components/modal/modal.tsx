import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GrClose } from 'react-icons/gr';
import ModalBody from './modal-body';
import ModalContainer from './modal-container';
import { CloseButton, ModalHeader } from './modal-header';
import ModalWrapper from './modal-wrapper';

interface ModalProps {
  close?: (...args: any) => void | Promise<void>;
  title?: string;
  children: ReactNode;
  showCloseBtn?: boolean;
  noHeader?: boolean;
  padding?: string;
  bodyClass?: string;
  containerClass?: string;
}

export default function Modal({
  close,
  title,
  children,
  showCloseBtn = true,
  noHeader = false,
  padding = '1em 1.5em',
  bodyClass = '',
  containerClass = '',
}: ModalProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) =>
    event.target === event.currentTarget && close && close();

  return createPortal(
    <ModalWrapper
      onClick={handleWrapperClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.1 } }}
    >
      <ModalContainer
        className={containerClass ? ` ${containerClass}` : ''}
        style={{ padding }}
        initial={{ opacity: 0, y: '-6em' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-6em', transition: { duration: 0.1 } }}
      >
        {!noHeader && (
          <ModalHeader>
            <h3>{title}</h3>
            {showCloseBtn && (
              <CloseButton onClick={close}>
                <GrClose />
              </CloseButton>
            )}
          </ModalHeader>
        )}
        <ModalBody className={bodyClass ? ` ${bodyClass}` : ''}>
          {children}
        </ModalBody>
      </ModalContainer>
    </ModalWrapper>,
    document.body,
  );
}
