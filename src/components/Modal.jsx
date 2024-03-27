import React from 'react'

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal