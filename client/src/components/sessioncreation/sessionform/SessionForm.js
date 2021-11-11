import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function SessionForm({ showForm, toggleForm }) {
  const handleClose = () => toggleForm();

  return (
    <>
      <Modal size="lg" show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
