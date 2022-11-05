import { useState, useCallback } from "react";

const useHttp = () => {
  const appid = "92ec983844507f607bf6431e3ffd98de";
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  //https://api.openweathermap.org/data/2.5/weather?
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response = await fetch(
        `${requestConfig.url}q=${requestConfig.cityName}&units=metric&appid=${appid}`
      );

      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const responseData = await response.json();

      applyData(responseData);
    } catch (err) {
      setHasError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
    hasError,
  };
};

export default useHttp;
