import React from 'react';
import './ui.scss';

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={() => setIsOpen(false)}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-content'>
          {/* <button className='close' onClick={() => setIsOpen(false)}>Close</button> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;