// This component lets the user enter the number of days until the next watering.
// Based on the lastWateredDate prop, it calculates and displays the next watering date
// (formatted like "Sep 15"), validates the input, and reports the computed value
// to the parent through onInput().

import React, { useState, useEffect } from "react";
import { validate } from "../util/validators";

function addDays(dateStr, days) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const base = new Date(y, m - 1, d); // safe construction, no TZ issues
    base.setDate(base.getDate() + Number(days));

    // Format as "Sep 15"
    return base.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

const NextWaterDateInput = (props) => {
    const [days, setDays] = useState(props.initialDays || "");
    const [nextDate, setNextDate] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    // Calculate next watering date, but do NOT overwrite isValid
    useEffect(() => {
        if (!props.lastWateredDate || days === "") {
            setNextDate("");
            props.onInput && props.onInput(props.id, "", false);
            return;
        }

        if (validate(days, props.validators || [])) {
            const computed = addDays(props.lastWateredDate, days);
            setNextDate(computed);
            props.onInput && props.onInput(props.id, computed, true);
        } else {
            setNextDate("");
            props.onInput && props.onInput(props.id, "", false);
        }
    }, [days, props.lastWateredDate]);

    return (
        <div className="input-wrapper">
            <input
                type="number"
                min="1"
                placeholder="Days until next watering"
                className={`number-input ${!isValid && isTouched ? "add-item-invalid" : ""}`}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                onBlur={() => {
                    setIsTouched(true);
                    setIsValid(!days || !validate(days, props.validators || []) ? false : true);
                }}
            />

            {nextDate && isValid && (
                <div className="next-water-result">
                    Next watering: <strong>{nextDate}</strong>
                </div>
            )}

            {!isValid && isTouched && (
                <div className="err">{props.errorText || "Please enter at least 1 day."}</div>
            )}
        </div>
    );
};

export default NextWaterDateInput;
