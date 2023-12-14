

export const getPixoUsers = () => {
    return fetch("http://localhost:8000/pixouser", {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        }
    }).then((res) => res.json())
}


export const getPixoUserAndCollectiblesById = async (userId) => {
    let url = `http://localhost:8000/pixouser/${userId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    });
    return await response.json();
  };
  