export const getAllCollectiblesAndUser = () => {
  return fetch("http://clownfish-app-2o2rw.ondigitalocean.app/collectibles", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getCollectibleById = async (itemId) => {
  let url = `http://clownfish-app-2o2rw.ondigitalocean.app/collectibles/${itemId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const createNewPost = async (newItem) => {
  const response = await fetch("http://clownfish-app-2o2rw.ondigitalocean.app/collectibles", {
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
  const response = await fetch(`http://clownfish-app-2o2rw.ondigitalocean.app/collectibles/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
