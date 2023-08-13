export const getBaseUrl = () => {
  const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return baseURL;
};
