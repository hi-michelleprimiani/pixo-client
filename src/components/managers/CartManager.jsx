export const getCartByUser = async () => {
  let url = `https://clownfish-app-2o2rw.ondigitalocean.app/cart`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const getCartItemsByCartId = async (cartId) => {
  let url = `https://clownfish-app-2o2rw.ondigitalocean.app/cartitems/${cartItemId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};

export const deleteCartItem = async (cartItemId) => {
  const response = await fetch(
    `https://clownfish-app-2o2rw.ondigitalocean.app/cartitems/${cartItemId}`,
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
  let url = `https://clownfish-app-2o2rw.ondigitalocean.app/cart?paid=true`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  return await response.json();
};
