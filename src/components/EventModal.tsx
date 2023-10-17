import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";

interface EventModalProps {
  showModal: boolean;
  selectedDate: Date | null;
  eventDesc: string;
  setEventDesc: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addEvent: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  showModal,
  selectedDate,
  eventDesc,
  setEventDesc,
  setShowModal,
  addEvent,
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
            <h2>Add Event for {format(selectedDate!, "MMMM do, yyyy")}</h2>
            <input type="text" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} />
            <button onClick={addEvent}>Add</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
