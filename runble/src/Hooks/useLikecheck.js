import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const postGood = async postId => {
  console.log(postId);
  return await instance.put(`http://54.167.169.43/api/like/${postId}`, {
    userId: 1
  });
};
export const useLikeCheck = () => {
  const queryClient = useQueryClient();
  return useMutation(postGood, {
    onSuccess: data => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("like");
      console.log(data); // mutation 이 성공하면 response를 받을 수 있다.
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};