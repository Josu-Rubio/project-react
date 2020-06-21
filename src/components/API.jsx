const axios = require("axios").default;

const register = (user, password) => {
  return axios({
    method: "post",
    url: "http://34.89.93.186:8080/apiv1/register",
    headers: {
      accept: "application/json"
    },
    data: {
      username: `${user}`,
      password: `${password}`
    },
    withCredentials: true
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error.response.data;
    });
};

const login = (user, password) => {
  return axios({
    method: "post",
    url: "http://34.89.93.186:8080/apiv1/login",
    headers: {
      accept: "application/json"
    },
    data: {
      username: `${user}`,
      password: `${password}`
    },
    withCredentials: true
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return error.response.data;
    });
};
const ads = query => {
  return axios({
    method: "get",
    url: `http://34.89.93.186:8080/apiv1/anuncios/${query}`,
    withCredentials: true
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return alert(`${error.response.data}`)
    })
};
const detail = id => {
  return axios({
    method: "get",
    url: `http://34.89.93.186:8080/apiv1/anuncios/${id}`,
    withCredentials: true
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response.data;
    });
};

export { register, login, ads, detail };
