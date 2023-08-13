import axios from "axios";

const { getBaseUrl } = require("./getBaseUrl");

export const getTopAnime = async () => {
  const latest = await axios.get(`${getBaseUrl()}/api/latest`, {
    headers: {
      "content-type": "application/json",
    },
    next: { revalidate: 60 },
  });
  return latest.data;
};
