import { post } from "./utils";

export async function getUrl(name, type, folder = "new-looks") {
  return post("/upload/signs3", { name, type, folder });
}

export async function uploadMedia(url, data) {
  return fetch(url, {
    method: "PUT",
    body: data,
  }).then(() => url.substring(0, url.indexOf("?")));
}
