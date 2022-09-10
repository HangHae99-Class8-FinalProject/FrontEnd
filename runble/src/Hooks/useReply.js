import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from "../Utils/Instance";



 const addReply = async (reply) =>{
    return await instance.post('http://localhost:8000/Comment',reply)
}

export const delReply = async (commentId) =>{
    console.log(commentId)
    const response = await instance.delete(`http://localhost:8000/Comment/${commentId}`);
    return commentId ;
}

export const editReply = async (reply) =>{
    console.log(reply)
    const response = await instance.put(`http://localhost:8000/Comment/${reply.commentId}`,{
      commentId:reply.commentId,
      nickname: reply.nickname,
      profile:reply.profile,
      comment:reply.comment,
      recommentCount:reply.recommentCount
    })
    return  reply.comment;
}



export const addReplyData = () =>{
    const queryClient = useQueryClient();
    return useMutation(addReply,{
        onSuccess: () =>{
            queryClient.invalidateQueries('GET_REPLY')
        }
    });
}
// 


// export const delReplyData = () =>{
//     const queryClient = useQueryClient();

//     return useMutation(delReply,{
//         onSuccess: (commentId) =>{
//             console.log(commentId)
//             console.log('삭제성공')
//             queryClient.invalidateQueries('GET_REPLY')
//         },
//         onError: (error) => {
//             console.log(error);
//           },
//     });
// }
