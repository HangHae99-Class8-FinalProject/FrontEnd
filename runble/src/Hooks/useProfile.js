import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const userProfile = async postId => {
  console.log(postId);
  return await instance.put(`http://54.167.169.43/api/user/setgoal`, {
    userId: 1
  });
};
export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userProfile, {
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