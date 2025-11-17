useNextWaterDate.js
import { useState, useEffect } from "react";

function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const base = new Date(y, m - 1, d);
  base.setDate(base.getDate() + Number(days));
  return base.toISOString().split("T")[0];
}

export function useNextWaterDate(lastWatered) {
  const [days, setDays] = useState("");
  const [nextDate, setNextDate] = useState("");

  useEffect(() => {
    if (!lastWatered || days === "") return setNextDate("");
    setNextDate(addDays(lastWatered, days));
  }, [days, lastWatered]);

  return { days, setDays, nextDate };
}