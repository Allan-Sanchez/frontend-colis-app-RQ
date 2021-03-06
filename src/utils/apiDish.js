// const API = "http://localhost:4000/api";
const API = import.meta.env.VITE_API_KEY;

export const createMenu = async (data) => {
  const res = await fetch(`${API}/menus`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const response = await res.json();
  return response;
};

export const createDish = async (data) => {
  const res = await fetch(`${API}/dishes`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const response = await res.json();
  return response;
};
