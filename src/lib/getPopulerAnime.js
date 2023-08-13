const { getBaseUrl } = require("./getBaseUrl");

export const getPopulerAnime = async () => {
  const populer = await fetch(`${getBaseUrl()}/api/populer`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  const json = populer.json();
  return json;
};
