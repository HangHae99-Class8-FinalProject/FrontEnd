import { useQuery } from "react-query";
import { instance } from "../Utils/Instance";
const postList = async nickname => {
  const { data } = await instance.get(`posts`);
  return data;
};
export const usePost = nickname => {
  return useQuery(["post"], () => postList(), {});
};
