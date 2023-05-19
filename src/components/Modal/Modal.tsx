import { motion } from "framer-motion";
import { ReactNode, useId } from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

import "./modal.scss";

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
  padding = "1em 1.5em",
  bodyClass = "",
  containerClass = "",
}: ModalProps) {
  const modalId = useId();
  const handleWrapperClick = (event) =>
    event.target.classList?.[0] === "modal-wrapper" && close();

  return createPortal(
    <motion.div
      className={"modal-wrapper"}
      onClick={handleWrapperClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.1 } }}
    >
      <motion.div
        className={
          "modal-container" + (containerClass ? ` ${containerClass}` : "")
        }
        style={{ padding }}
        initial={{ opacity: 0, y: "-6em" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-6em", transition: { duration: 0.1 } }}
      >
        {!noHeader && (
          <div className={"modal-header"}>
            <h3>{title}</h3>
            {showCloseBtn && (
              <button onClick={close} className={"btn-close reset"}>
                <GrClose />
              </button>
            )}
          </div>
        )}
        <div className={"modal-body" + (bodyClass ? ` ${bodyClass}` : "")}>
          {children}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
