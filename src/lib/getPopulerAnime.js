import axios from "axios";

const { getBaseUrl } = require("./getBaseUrl");

export const getPopulerAnime = async () => {
  const populer = await axios.get(`${getBaseUrl()}/api/populer`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  return populer.data;
};
