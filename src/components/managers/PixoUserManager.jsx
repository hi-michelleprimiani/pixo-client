export const getPixoUsers = () => {
  return fetch("https://clownfish-app-2o2rw.ondigitalocean.app/pixouser", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getPixoUserAndCollectiblesById = async (userId) => {
  let url = `https://clownfish-app-2o2rw.ondigitalocean.app/pixouser/${userId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
