import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './SessionForm.css';

export default function SessionForm({ showForm, toggleForm, postWorkout }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleClose = () => toggleForm();

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleNotes(e) {
    setNotes(e.target.value);
  }
  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return alert('Please enter a title bruh');
    if (!date) return alert('Cmon man you need to put a date');
    if (!notes) return alert('Nothing?');

    postWorkout(title, date, notes);

    setTitle('');
    setDate('');
    setNotes('');
    handleClose();
  }

  return (
    <>
      <Modal size="lg" show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Session Details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="input__details">
          <form onSubmit={handleSubmit} className="form_container">
            <h4>Title</h4>
            <input
              type="text"
              placeholder="Insert a title..."
              value={title}
              onChange={handleTitle}
            ></input>
            <h4>Date</h4>

            <input
              type="datetime-local"
              name="date"
              placeholder="Date"
              value={date}
              onChange={handleDate}
            ></input>
            <h4>Notes</h4>

            <textarea
              type="text"
              placeholder="Insert notes..."
              value={notes}
              onChange={handleNotes}
              rows={7.5}
              cols={70}
            ></textarea>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
