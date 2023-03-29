import React from 'react';
import { Modal, ModalProps } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

export interface BaseModalProps extends ModalProps {
  children?: any
}

const BaseModal = React.forwardRef<HTMLDivElement, BaseModalProps>((props, ref) => {
  const {
    children,
    center = true,
    ...rest
  } = props;

  return (
    <Modal ref={ref} center={center} {...rest}>
      {children}
    </Modal>
  )
})

export default BaseModal;