import { useQuery, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";

const likePatchList = async postId => {
  console.log(postId);
  const { data } = await instance.get(`posts/?page=${postId}`);
  return data;
};
export const useLike = postId => {
  const queryClient = useQueryClient();
  return useQuery(["post", postId], () => likePatchList(postId), {
    enabled: !!postId
  });
};
