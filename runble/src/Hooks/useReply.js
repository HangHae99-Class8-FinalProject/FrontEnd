import { instance } from "../Utils/Instance";

export const getReply = async () => {
    return await instance.get("http://localhost:8000/Comment");
    //return await instance.get('http://54.167.169.43/api/comment/1/1')
  };

 export const addReply = async (reply) =>{
    return await instance.post('http://localhost:8000/Comment',reply)
}

export const delReply = async (id) =>{
    const response = await instance.delete(`http://localhost:8000/Comment/${id}`);
    return response.data ;
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
    return  response.data;
}




