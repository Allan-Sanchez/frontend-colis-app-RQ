const API = "http://localhost:4000/api/upload";

export const uploadImage = async (file) => {
  console.log(file);
  const res = await fetch(`${API}/restaurant`, {
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
  const res = await fetch(`${API}/dish`, {
    method: "POST",
    body: JSON.stringify({ data: file }),
    headers: { "Content-Type": "application/json" },
  });
  // response = await res.json();
  const resImage = await res.json();
  return resImage;
  //   return response;
};
