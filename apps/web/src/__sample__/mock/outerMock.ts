import axios from 'axios';

export const getUser = async (url: string) => {
  const response = await axios.get(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};
