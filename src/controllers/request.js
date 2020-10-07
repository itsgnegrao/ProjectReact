import axios from "axios";

// Metodos sem Autenticação
export async function postWithoutLogin(link, body) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: ""
    }
  };
  let resp = await axios
    .post(link, JSON.stringify(body), config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return { message: "erro" };
    })
    .then(r => {
      return r;
    });

  return resp;
}

// Metodos com Autenticação
export async function postWithLogin(link, body, user) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: user.token
    }
  };

  let resp = await axios
    .post(link, JSON.stringify(body), config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return { message: "erro" };
    })
    .then(r => {
      return r;
    });

  return resp;
}

export async function getWithLogin(link, user) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: user.token
    }
  };

  let resp = await axios
    .get(link, config)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return { message: "erro" };
    })
    .then(r => {
      return r;
    });

  return resp;
}

export async function putWithLogin(link, body, user) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: user.token
    }
  };
  let resp = await axios
    .put(link, JSON.stringify(body), config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return { message: "erro" };
    })
    .then(r => {
      return r;
    });

  return resp;
}

export async function deleteWithLogin(link, user) {
  var config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: user.token
    }
  };
  let resp = await axios
    .delete(link, config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      return { message: "erro" };
    })
    .then(r => {
      return r;
    });

  return resp;
}
