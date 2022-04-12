import React from 'react'

const popupModal = ({ Widget, setShowModal }) => {
  return (
    <div className="modal_window">
      <div className="inner d-flex align-items-center justify-content-center vh-100  hide-scrollbar">
        <div className="flex-1">
          <Widget setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
};

export default popupModal