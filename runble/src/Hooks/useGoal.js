import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const postGoal = async () => {
  return await instance.post(`http://54.167.169.43/api/user/goal`);
};
export const useGoal = () => {
  const queryClient = useQueryClient();
  return useMutation(postGoal, {
    onSuccess: data => {
      console.log(data); // mutation 이 성공하면 response를 받을 수 있다.
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};
