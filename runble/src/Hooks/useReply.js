import { instance } from "../Utils/Instance";

export const addReply = async ({comment,postId}) => {
  console.log(comment)
  console.log(postId)
  try{
    const response = await instance.post(`http://54.167.169.43./api/comment/${postId}`,{
      comment:comment
    })
    console.log(response)
    return response.data
  }catch(error){
    console.log(error.code)
  }
}


export const delReply = async (id)=>{
  console.log(id)
  try{
    const response = await instance.delete(`http://54.167.169.43/api/comment/${id}`)
    return response.data
  }catch(error){
    console.log(error.code)
  }
}


export const editReply = async ({comment,commentId}) =>{
  try{
      console.log(commentId)
        const response = await instance.put(`http://54.167.169.43/api/comment/${commentId}`,
          {comment:comment}
        )
        console.log(response.data)
        return response.data
      }catch(error){
        console.log(error.code)
      }
    
}


