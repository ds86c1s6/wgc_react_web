import { InstanceModal, InstanceModalProps } from "./instanceModal";
import { create } from "./createPromise";

export const showInstanceModal = (props?: any) => {
  const Props = {
    open: true,
    ...props,
  };
  return create(InstanceModal, Props);
};

export function useShowInstance() {
  const isShowModal = true;

  const showModal = async () => {
    return new Promise((resolve, reject) => {
      if (isShowModal) {
        showInstanceModal()
          .then((value) => {
            resolve(value);
          })
          .catch((value) => {
            reject(value);
          });
      }
    });
  };

  return showModal;
}
