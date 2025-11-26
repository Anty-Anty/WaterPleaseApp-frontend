// The hook takes a basename ("plant", "water") and generates a list of
// available images from the public/images folder (e.g., plant_1.svg, plant_2.svg).
// The resulting list is used to render all selectable images for that base word.
// Example output:
//   [ { id: 1, img: 1 }, { id: 2, img: 2 } ]


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