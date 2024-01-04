export const getMessagesByUser = async () => {
  let url = `http://clownfish-app-2o2rw.ondigitalocean.app/messages`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const createMessage = async (newMessage) => {
  const response = await fetch("http://clownfish-app-2o2rw.ondigitalocean.app/messages", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });
  return response;
};
