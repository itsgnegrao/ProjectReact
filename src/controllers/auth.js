import { postWithoutLogin } from "./request";

export async function doLogin(email, senha) {
  let link = process.env.REACT_APP_API_URL_APIV1 + "/login";
  let body = { username: email, password: senha };

  let resp = await postWithoutLogin(link, body);
  return resp;
}
