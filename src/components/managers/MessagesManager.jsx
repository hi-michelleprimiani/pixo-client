



export const getMessagesByUser = async () => {
    let url = `http://localhost:8000/messages`
    const response = await fetch(url, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
          },
    })
    return await response.json()
}


export const createMessage = async (newMessage) => {
    const response = await fetch('http://localhost:8000/messages', {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    return response;
}