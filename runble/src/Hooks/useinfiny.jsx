import { useQuery, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";

const postList = async page => {
  console.log(page);
  const { data } = await instance.get(`posts/?page=${page}`);
  return data;
};
export const usePost = page => {
  const queryClient = useQueryClient();
  return useQuery(["post", page], () => postList(page), {
    enabled: !!page
  });
};

const lankingList = async nickname => {
  const { data } = await instance.get(`like`);
  return data;
};
export const uselankingList = nickname => {
  return useQuery(["like"], () => lankingList(), {
    enabled: false
  });
};
