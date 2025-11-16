import React, { useState, useRef, useEffect } from "react";
import { validate } from "../util/validators";
import "./CustomDateInput.css";

// --- Helper: safely format YYYY-MM-DD into "Mon 10" ---
function formatDisplayDate(dateStr, locale = "en-US") {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d); // SAFE → no timezone shift
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

const CustomDateInput = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.initialValue || "");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(props.initialValidity || false);

  const inputRef = useRef(null);

  // Format for the visible div
  const formatted = selectedDate
    ? formatDisplayDate(selectedDate)
    : props.placeholder || "Select date";

  // When user selects date
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);

    const valid = validate(value, props.validators);
    setIsValid(valid);

    props.onInput && props.onInput(props.id, value, valid);
  };

  // When user clicks the visible div → open date picker
  const handleClick = () => {
    setIsTouched(true);
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.focus();
    }
  };

  // Sync with parent on load/updates
  useEffect(() => {
    if (props.initialValue) {
      setSelectedDate(props.initialValue);
      setIsValid(props.initialValidity || true);
    }
  }, [props.initialValue, props.initialValidity]);

  return (
    <div className="input-wrapper-date-input">
      <div
        className={`input-like-div ${!isValid && isTouched ? "add-item-invalid" : ""}`}
        onClick={handleClick}
      >
        {formatted}
      </div>

      {/* Hidden real date input */}
      <input
        ref={inputRef}
        type="date"
        value={selectedDate}
        onChange={handleChange}
        onBlur={() => setIsTouched(true)}
        className="hidden-date-input"
      />

      {/* Validation error */}
      {!isValid && isTouched && (
        <div className="err">{props.errorText}</div>
      )}
    </div>
  );
};

export default CustomDateInput;