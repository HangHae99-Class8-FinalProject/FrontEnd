import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "axios";
const postGoal = async postId => {
  console.log(postId);
  return await axios.put(`http://54.167.169.43/api/user/setgoal`, {
    userId: 1
  });
};
export const useAddGoalMutation = () => {
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
