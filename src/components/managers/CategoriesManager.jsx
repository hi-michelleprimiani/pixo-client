export const getAllCategories = () => {
  return fetch("http://clownfish-app-2o2rw.ondigitalocean.app/categories", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};
