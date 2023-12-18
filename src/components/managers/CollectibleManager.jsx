export const getAllCollectiblesAndUser = () => {
  return fetch("http://localhost:8000/collectibles", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getCollectibleById = async (itemId) => {
  let url = `http://localhost:8000/collectibles/${itemId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const createNewPost = async (newItem) => {
  const response = await fetch("http://localhost:8000/collectibles", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  return response;
};

export const deleteCollectible = async (itemId) => {
  const response = await fetch(`http://localhost:8000/collectibles/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
