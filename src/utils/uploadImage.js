const API = import.meta.env.VITE_API_KEY;

export const uploadImage = async (file) => {
  console.log(file);
  const res = await fetch(`${API}/upload/restaurant`, {
    method: "POST",
    body: JSON.stringify({ data: file }),
    headers: { "Content-Type": "application/json" },
  });
  // response = await res.json();
  const resImage = await res.json();
  return resImage;
  //   return response;
};

export const uploadImageDish = async (file) => {
  const res = await fetch(`${API}/upload/dish`, {
    method: "POST",
    body: JSON.stringify({ data: file }),
    headers: { "Content-Type": "application/json" },
  });
  // response = await res.json();
  const resImage = await res.json();
  return resImage;
  //   return response;
};
