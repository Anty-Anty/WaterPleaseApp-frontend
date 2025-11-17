const NextWaterDateInput = (props) => {
    const [days, setDays] = useState(props.initialDays || "");
    const [nextDate, setNextDate] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

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
        <div className="next-water-wrapper">
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
