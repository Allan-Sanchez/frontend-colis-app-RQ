const API = import.meta.env.VITE_API_KEY;

export const getRestaurants = async () => {
  const res = await fetch(`${API}/restaurants`);
  const response = await res.json();
  return response;
};

export const getOneRestaurant = async (id) => {
  const res = await fetch(`${API}/restaurants/${id}`);
  const response = await res.json();
  return response;
};

export const getOneMenu = async (id) => {
  const res = await fetch(`${API}/menus/${id}`);
  const response = await res.json();
  return response;
};

export const addRestaurant = async (data) => {
  // if (data.phone.length > 0) {
  //   await fetch(`${API}/phones`, {
  //     method: "POST",
  //     body: JSON.stringify(data.phone),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   delete data.phone;
  // }
  // console.log(data);
  const res = await fetch(`${API}/restaurants`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  // return ID restaurant
  const response = await res.json();
  console.log(response);
  return response;
};
