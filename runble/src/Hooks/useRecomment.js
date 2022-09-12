import { instance } from "../Utils/Instance";

export const getRecomment = async () => {
    return await instance.get("http://localhost:8001/Recomment");
    //return await instance.get('http://54.167.169.43/api/comment/1/1')
  };

 export const addReply = async (reply) =>{
    console.log(reply)
    return await instance.post('http://localhost:8001/Recomment',reply)
}

export const delReply = async (id) =>{
    const response = await instance.delete(`http://localhost:8001/Recomment/${id}`);
    return response.data ;
}

export const editReply = async (reply) =>{
    console.log(reply)
    const response = await instance.put(`http://localhost:8001/Recomment/${reply.commentId}`,{
      commentId:reply.commentId,
      recommentId:reply.recommentId,
      nickname: reply.nickname,
      profile:reply.profile,
      comment:reply.comment,
      
    })
    return  response.data;
}




