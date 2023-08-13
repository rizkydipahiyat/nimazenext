import { getBaseUrl } from "./getBaseUrl";

export const getOngoingAnime = async () => {
  const ongoing = await fetch(`${getBaseUrl()}/api/ongoing`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  const json = ongoing.json();
  return json;
};
