import React from 'react';
import Modal from 'react-modal';
import Scanner from '../components/scanner';

export default props => {
  const {
    title, isOpen, askToClose,
    onAfterOpen, onRequestClose, onChangeInput,
  } = props;

  return (
    <Modal
      contentLabel="modal_scan"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button type="button" className="close" onClick={onRequestClose}>
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="modal-body">
          <Scanner />
        </div>
      </div>
    </Modal>
  );
}