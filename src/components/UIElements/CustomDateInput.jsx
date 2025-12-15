/**
 * CustomDateInput
 *
 * A custom-styled date input that replaces the native browser UI.
 * The visible div acts as the clickable date field, and the hidden
 * <input type="date"> handles the actual date picking.
 *
 * Features:
 * - Displays the selected date in a formatted form (e.g., "Feb 12").
 * - Runs validation using provided validators.
 * - Notifies parent components using `onInput(id, value, isValid)`.
 * - Shows an error message when invalid and touched.
 * - Syncs internal state when `initialValue` or `initialValidity` change.
 *
 * Behaves like a fully controlled input but with a custom appearance.
 */

import React, { useState, useRef, useEffect } from "react";
import { validate } from "../util/validators";
import { formatDisplayDate } from "../util/days";
import "./CustomDateInput.css";

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