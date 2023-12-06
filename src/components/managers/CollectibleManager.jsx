

export const getAllCollectibles = () => {
    return fetch("http://localhost:8000/collectibles", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    }).then((res) => res.json());
  };