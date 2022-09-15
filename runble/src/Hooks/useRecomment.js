import { instance } from "../Utils/Instance";

 export const addReply = async ({comment,recommentId,commentId}) =>{
  console.log(recommentId)
  try{
    const response = await instance.post(`http://54.167.169.43./api/comment/${commentId}`,{comment:comment}
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

export const editReply = async ({comment,recommentId,commentId}) =>{
    console.log(comment)
    try{
      const response = await instance.put(`http://54.167.169.43./api/comment/${commentId}/${recommentId}`,{comment:comment}
   )
   console.log(response)
   return response.data
  }catch(error){
      console.log(error.code)
    }
}




