import { instance } from "../Utils/Instance";
import { useQuery } from "react-query";

const fetchNodeList = async userId => {
  if (!userId) return;
  const { data } = await instance.get(
    `http://54.167.169.43/api/user/${userId}`
  );
  return data;
};

export const useProgress = userId => {
  return useQuery(["userGoal", userId], () => fetchNodeList(userId), {
    enabled: !!userId,
    refetchOnWindowFocus: false
  });
};
