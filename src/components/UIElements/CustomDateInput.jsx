import React, { useState, useRef, useEffect } from "react";
import { validate } from "../util/validators";
import "./CustomDateInput.css"; // uses your existing styles

const CustomDateInput = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.initialValue || "");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(props.initialValidity || false);

  const inputRef = useRef(null);

  const formatted = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : props.placeholder || "Select date";

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    const valid = validate(value, props.validators);
    setIsValid(valid);
    props.onInput && props.onInput(props.id, value, valid);
  };

  const handleClick = () => {
    setIsTouched(true);
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (props.initialValue) {
      setSelectedDate(props.initialValue);
      setIsValid(props.initialValidity || true);
    }
  }, [props.initialValue, props.initialValidity]);

  return (
    <div className="input-wrapper">
      <div
        className={`input-like-div ${!isValid && isTouched ? "add-item-invalid" : ""}`}
        onClick={handleClick}
      >
        {formatted}
      </div>

      <input
        ref={inputRef}
        type="date"
        value={selectedDate}
        onChange={handleChange}
        onBlur={() => setIsTouched(true)}
        className="hidden-date-input"
      />

      {!isValid && isTouched && <div className="err">{props.errorText}</div>}
    </div>
  );
};

export default CustomDateInput;