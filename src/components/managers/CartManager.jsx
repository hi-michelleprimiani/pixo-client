export const getCartByUser = async () => {
  let url = `http://localhost:8000/cart`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const getCartItemsByCartId = async (cartId) => {
  let url = `http://localhost:8000/cartitems/${cartItemId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const deleteCartItem = async (cartItemId) => {
  const response = await fetch(
    `http://localhost:8000/cartitems/${cartItemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};


export const getPaidCart = async () => {
  let url = `http://localhost:8000/cart?paid=true`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
