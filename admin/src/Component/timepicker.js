import "rc-time-picker/assets/index.css";
import React, { useState } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";

const TimeRangePicker = ({ value, onChange }) => {
  const initialValue = moment.isMoment(value.start) ? value.start : null;
  const initialValueEnd = moment.isMoment(value.end) ? value.end : null;

  const [value1, setValue1] = useState(initialValue);
  const [value2, setValue2] = useState(initialValueEnd);

  const handleValueChange1 = (value1) => {
    if (!value1) {
      setValue1(null);
      onChange({ start: null, end: value2 });
      return;
    }
    if (value2 && value1.isAfter(value2)) {
      setValue2(value1.clone().add(1, "hour"));
      onChange({ start: value1, end: value2 });
    } else {
      setValue1(value1);
      onChange({ start: value1, end: value2 });
    }
  };

  const handleValueChange2 = (value2) => {
    if (!value2) {
      setValue2(null);
      onChange({ start: value1, end: null });
      return;
    }
    if (value1 && value2.isBefore(value1)) {
      setValue1(value2.clone().subtract(1, "hour"));
      onChange({ start: value1, end: value2 });
    } else {
      setValue2(value2);
      onChange({ start: value1, end: value2 });
    }
  };

  return (
    <div>
      <TimePicker
        value={value1}
        format={"hh:mm A"}
        showSecond={false}
        onChange={handleValueChange1}
      />
      <TimePicker
        value={value2}
        format={"hh:mm A"}
        showSecond={false}
        onChange={handleValueChange2}
      />
    </div>
  );
};

TimeRangePicker.defaultProps = {
  value: { start: null, end: null }
};

export default TimeRangePicker;
