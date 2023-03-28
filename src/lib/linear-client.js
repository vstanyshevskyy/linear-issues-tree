import { LinearClient } from "@linear/sdk";

export const LINEAR_API_KEY_STORAGE_KEY = "linear_api_key";

const getClient = () => {
  const apiKey = window.localStorage.getItem(LINEAR_API_KEY_STORAGE_KEY);
  if(!apiKey) {
    throw new Error('Please set the Linear API key first')
  }

  return new LinearClient({
    apiKey,
  });
}

export default getClient;
