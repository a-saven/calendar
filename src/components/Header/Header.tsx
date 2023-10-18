const CalendarHeader: React.FC = () => {
  return (
    <div className="calendar-header">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <div key={index}>{day}</div>
      ))}
    </div>
  );
};

export default CalendarHeader;
