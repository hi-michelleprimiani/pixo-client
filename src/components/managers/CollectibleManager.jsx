

export const getAllCollectibles = () => {
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
  