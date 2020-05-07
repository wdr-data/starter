import { useCallback } from "react";
const numberFormatter = new Intl.NumberFormat('de-DE');

export const useNumberFormatter = (question) => useCallback(
    (num) => {
        const precision = Math.pow(10, question.precision);
        return numberFormatter.format(Math.round(Number(num) * precision) / precision);
    },
    [question]
);
