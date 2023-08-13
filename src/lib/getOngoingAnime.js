import axios from "axios";
import { getBaseUrl } from "./getBaseUrl";

export const getOngoingAnime = async () => {
  const ongoing = await axios.get(`${getBaseUrl()}/api/ongoing`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  return ongoing.data;
};
