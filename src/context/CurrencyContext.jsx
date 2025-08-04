import { useEffect, useState } from "react";
import { CurrencyContext } from "./CurrenyContextObject";

export const CurrencyProvider = ({ children }) => {
  const FALLBACK_RATE = 80; // fallback INR rate if API fails
  const [rate, setRate] = useState(FALLBACK_RATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=INR")
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.INR) {
          setRate(data.rates.INR);
        } else {
          setError("Failed to fetch INR rate.");
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Exchange rate error: " + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <CurrencyContext.Provider value={{ rate, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
};