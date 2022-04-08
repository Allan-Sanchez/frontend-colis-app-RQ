import React, { useState, useEffect } from "react";
const API = "http://localhost:4000/api";
function useUploadImage(file) {
  const [response, setResponse] = useState(second);

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      let base64EncodedImage = reader.result;
      const res = await fetch(`${API}/upload/restaurant`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      // response = await res.json();
      const resImage = await res.json();
      setResponse(resImage);
    };
  }, []);

  return {
    data: response,
  };
}

export default useUploadImage;
