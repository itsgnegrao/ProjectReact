import { postWithoutLogin } from "./request";

export async function doLogin(email, senha) {
  let link = String(process.env.REACT_APP_API_URL + "/api/login");
  let body = { username: email, password: senha };

  let resp = await postWithoutLogin(link, body);
  return resp;
}

export async function doLogout() {
  let link = String(process.env.REACT_APP_API_URL + "/api/logout");

  let resp = await postWithoutLogin(link, null);
  return resp;
}