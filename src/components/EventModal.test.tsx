import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventModal from './EventModal';  // Adjust the import to your folder structure
import { format } from 'date-fns';

describe('EventModal', () => {
  const mockAddEvent = jest.fn();
  const mockEditEvent = jest.fn();
  const mockSetShowModal = jest.fn();
  const mockSetEventDesc = jest.fn();

  const baseProps = {
    showModal: true,
    selectedDate: new Date('2023-10-17'),
    eventDesc: 'Test Event',
    setShowModal: mockSetShowModal,
    setEventDesc: mockSetEventDesc,
    addEvent: mockAddEvent,
    editEvent: mockEditEvent,
    isEditing: false,
  };

  test('renders modal when showModal is true', () => {
    render(<EventModal {...baseProps} />);
    expect(screen.getByText(`Add Event for ${format(baseProps.selectedDate!, 'MMMM do, yyyy')}`)).toBeInTheDocument();
  });

  test('does not render modal when showModal is false', () => {
    render(<EventModal {...baseProps} showModal={false} />);
    expect(screen.queryByText(/Event for/)).toBeNull();
  });

  test('calls appropriate action on button click', () => {
    render(<EventModal {...baseProps} />);
    fireEvent.click(screen.getByText('Add'));
    expect(mockAddEvent).toHaveBeenCalled();

    render(<EventModal {...baseProps} isEditing={true} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(mockEditEvent).toHaveBeenCalled();
  });

  test('closes modal on close button click', () => {
    render(<EventModal {...baseProps} />);
    fireEvent.click(screen.getByText('X'));
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
