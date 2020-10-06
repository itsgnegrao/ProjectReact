export async function postWithoutLogin(link, body) {
  let resp = await fetch(link, {
    method: "POST",
    headers: {
      "Service-Worker": "fortron-e-commerce",
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: ""
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
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

export async function postWithLogin(link, body, user) {
  let resp = await fetch(link, {
    method: "POST",
    headers: {
      "Service-Worker": "fortron-e-commerce",
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Basic " + user.token
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
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
