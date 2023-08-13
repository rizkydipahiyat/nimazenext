import { getBaseUrl } from "./getBaseUrl";

export const getTopAnime = async () => {
  const latest = await fetch(`${getBaseUrl()}/api/latest`, {
    headers: {
      "content-type": "application/json",
    },
  });
  const json = await latest.json();
  return json;
};
