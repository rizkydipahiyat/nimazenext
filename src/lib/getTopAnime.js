const { getBaseUrl } = require("./getBaseUrl");

export const getTopAnime = async () => {
  const latest = await fetch(`${getBaseUrl()}/api/latest`, {
    headers: {
      "content-type": "application/json",
    },
    next: { revalidate: 60 },
  });
  const json = latest.json();
  return json;
};
