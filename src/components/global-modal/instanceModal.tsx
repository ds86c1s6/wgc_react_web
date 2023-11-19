import React, { useEffect, useState } from 'react';
import BaseModal, { BaseModalProps } from './baseModal';
import { Button } from 'antd'

export interface InstanceModalProps extends BaseModalProps {
  onResolve?: () => void;
  onReject?: () => void;
  className?: string;
}

export const InstanceModal = React.forwardRef<HTMLDivElement, InstanceModalProps>((props, ref) => {
  const {
    children,
    className,
    onClose,
    open,
    showCloseIcon = false,
    onResolve,
    onReject,
    ...rest
  } = props;
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setModalOpen(open)
  }, [open])

  const closeModal = () => setModalOpen(false)

  const handleResolve = () => {
    closeModal();
    onResolve && onResolve(123);
  }

  const handleReject = () => {
    closeModal();
    onReject && onReject(456);
  }

  return (
    <BaseModal
      ref={ref}
      open={modalOpen}
      showCloseIcon={showCloseIcon}
      onClose={closeModal}
      {...rest}
    >
      <Button onClick={handleResolve}>完成</Button>
      <Button onClick={handleReject}>取消</Button>
      135135135435
    </BaseModal>
  )
})