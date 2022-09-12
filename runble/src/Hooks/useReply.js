import { instance } from "../Utils/Instance";


export const getReply = async () => {
    return await instance.get("http://localhost:8000/Comment");
    //return await instance.get('http://54.167.169.43/api/comment/1/1')
  };


//목데이터용
 export const addReply = async (reply) =>{
    return await instance.post('http://localhost:8000/Comment',reply)
}

// export const addReply = async (reply) => {
//   console.log(reply)
//   try{
//     const response = await
//     instance({
//       method: "post",
//       url: `http://54.167.169.43/api/comment/1`,
//       data:reply
//     })
//     console.log(response)
//     return response.data
//   }catch(error){
//     console.log(error.code)
//   }
// }


//목 데이터용
export const delReply = async (id) =>{
    const response = await instance.delete(`http://localhost:8000/Comment/${id}`);
    return response.data ;
}

// export const delReply = async (id)=>{
//   try{
//     const response = await instance.editReply(`http://54.167.169.43/api/comment/${id}`)
//     return response.data
//   }catch(error){
//     console.log(error.code)
//   }
// }



//목데이터 용
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


// export const editReply = async (reply) =>{
//   try{
//       console.log(reply.comment)
//         const response = await
//         instance({
//           method: "put",
//           url: `http://54.167.169.43/api/comment/${reply.commentId}`,
//           data:reply.comment
//         })
//         console.log(response)
//         return response.data
//       }catch(error){
//         console.log(error.code)
//       }
    
// }


