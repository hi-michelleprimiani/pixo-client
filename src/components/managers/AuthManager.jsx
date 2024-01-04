export const loginUser = (user) => {
  return fetch("https://clownfish-app-2o2rw.ondigitalocean.app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const registerUser = (newUser) => {
  return fetch("https://clownfish-app-2o2rw.ondigitalocean.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};
