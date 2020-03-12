import request from "superagent";
export const JWT = "JWT";
const baseUrl = "http://localhost:4000";

export const getImages = () => (dispatch, getState) => {
  const state = getState();
  const { images } = state;
  if (!images.length) {
    request(`${baseUrl}/image`)
      .then(response => {
        const action = allImages(response.body);
        dispatch(action);
      })
      .catch(console.error);
  }
};

export const createUser = data => (dispatch, getState) => {
  console.log("HERE");
  request
    .post(`${baseUrl}/user`)
    .send(data)
    .then(response => {
      dispatch(newUser(response));
    });
};

export const createImage = data => (dispatch, getState) => {
  const state = getState();
  const { user } = state;
  request
    .post(`${baseUrl}/image`)
    .set("Authorization", `Bearer ${user.jwt}`)
    .send(data)
    .then(response => {
      const action = newImage(response.body);
      dispatch(action);
    })
    .catch(console.error);
};

export const login = data => (dispatch, getState) => {
  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(response => {
      console.log("RESPONSE ", response);
      const action = newLogin(response.body);
      dispatch(action);
    })
    .catch(err => console.log("from err: ", err));
};

function newUser(data) {
  return {
    type: "NEW_USER",
    payload: data
  };
}

function newLogin(payload) {
  return {
    type: "JWT",
    payload: payload
  };
}

function newImage(image) {
  return {
    type: "NEW_IMAGE",
    payload: image
  };
}

function allImages(images) {
  return {
    type: "ALL_IMAGES",
    payload: images
  };
}
