import { useState, useEffect } from "react";

export const useImagesList = (basename) => {
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    const found = [];
    let i = 1;

    const checkNext = () => {
      const testImg = new Image();
      testImg.src = `images/${basename}_${i}.svg`;

      testImg.onload = () => {
        found.push({ id: i, img: i }); // format like LogoPicker expects
        i++;
        checkNext();
      };

      testImg.onerror = () => {
        setLogoList(found);
      };
    };

    checkNext();
  }, [basename]);

  return logoList;
};