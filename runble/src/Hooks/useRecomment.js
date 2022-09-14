import { instance } from "../Utils/Instance";



 export const addReply = async ({comment,recommentId,commentId}) =>{
  console.log(recommentId)
  try{
    const response = await instance.post(`http://54.167.169.43./api/comment/${commentId}/${recommentId}`,{comment:comment}
    )
    console.log(response)
    return response.data
  }catch(error){
    console.log(error.code)
  }
}

export const delReply = async (id) =>{
    const response = await instance.delete(`http://54.167.169.43./api/comment/${id.commentId}/${id.recommentId}`);
    return response.data ;
}

export const editReply = async (reply) =>{
    console.log(reply)
    const response = await instance.put(`http://localhost:8001/Recomment/${reply.recommentId}`,{
      commentId:reply.commentId,
      recommentId:reply.recommentId,
      nickname: reply.nickname,
      profile:reply.profile,
      comment:reply.comment,
      
    })
    return  response.data;
}




