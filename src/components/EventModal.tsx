import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import "./EventModal.css";

interface EventModalProps {
  showModal: boolean;
  selectedDate: Date | null;
  eventDesc: string;
  setEventDesc: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addEvent: () => void;
  editEvent: () => void;
  isEditing: boolean;
}

const EventModal: React.FC<EventModalProps> = ({
  showModal,
  selectedDate,
  eventDesc,
  setEventDesc,
  setShowModal,
  addEvent,
  editEvent,
  isEditing,
}) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>
              X
            </button>
            <h2 className="modal-title">
              {isEditing ? "Edit" : "Add"} Event for {format(selectedDate!, "MMMM do, yyyy")}
            </h2>
            <input
              className="modal-input"
              type="text"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
            <div className="button-container">
              <button className="action-button" onClick={isEditing ? editEvent : addEvent}>
                {isEditing ? "Edit" : "Add"}
              </button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
