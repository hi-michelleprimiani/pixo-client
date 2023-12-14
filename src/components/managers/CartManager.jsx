


export const getCartByUser = async () => {
    let url = `http://localhost:8000/cart`
    const response = await fetch(url, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
          },
    })
    return await response.json()
}

