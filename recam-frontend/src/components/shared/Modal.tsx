import type { ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
  onClose: () => void; // close botton function
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
