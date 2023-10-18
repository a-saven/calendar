import { format, addMonths, subMonths } from "date-fns";

interface CalendarNavProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarNav: React.FC<CalendarNavProps> = ({ currentDate, setCurrentDate }) => {
  return (
    <div className="nav-area">
      <span className="nav-button" onClick={() => setCurrentDate((prevDate) => subMonths(prevDate, 1))}>
        &lt;
      </span>
      <span>{format(currentDate, "MMMM yyyy")}</span>
      <span className="nav-button" onClick={() => setCurrentDate((prevDate) => addMonths(prevDate, 1))}>
        &gt;
      </span>
    </div>
  );
};

export default CalendarNav;
