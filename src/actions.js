import request from "superagent";

export const ALL_IMAGES = "ALL_IMAGES";

// const baseUrl = "http://localhost:4000";
const baseUrl = "https://ksenia-imageboard.herokuapp.com";

function allImages(payload) {
  return {
    type: ALL_IMAGES,
    payload
  };
}

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

export const NEW_IMAGE = "NEW_IMAGE";

function newImage(payload) {
  return {
    type: NEW_IMAGE,
    payload
  };
}

export const createImage = data => (dispatch, getState) => {
  const state = getState();
  const { user } = state;

  request
    .post(`${baseUrl}/image`)
    .set("Authorization", `Bearer ${user}`)
    .send(data)
    .then(response => {
      const action = newImage(response.body);

      dispatch(action);
    })
    .catch(console.error);
};

export const JWT = "JWT";

function loginSuccess(payload) {
  return {
    type: JWT,
    payload
  };
}

export const login = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/login`)
    .send({ email, password })
    .then(response => {
      const action = loginSuccess(response.body.jwt);

      dispatch(action);
    })
    .catch(console.error);
};

export const signup = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/user`)
    .send({ email, password })
    .then(response => {
      console.log(response);
      response.body.email && dispatch(login(email, password));
    })
    .catch(console.error);
};
