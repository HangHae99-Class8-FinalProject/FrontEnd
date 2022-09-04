// import { instance } from "../Utils/Instance";
// import { useQueryClient, useMutation } from "react-query";
// const postList = async profile => {
//   const { data } = await instance.post(`profile`, profile);
//   return data;
// };
// export const useAddSuperHeroData = profile => {
//   const queryClient = useQueryClient();

//   return useMutation(postList(profile), {
//     onSuccess: () => {
//       queryClient.invalidateQueries("post");
//     }
//   });
// };
