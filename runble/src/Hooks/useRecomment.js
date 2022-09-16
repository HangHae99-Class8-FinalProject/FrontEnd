import { instance } from "../Utils/Instance";

export const addRecomment = async ({ comment, commentId }) => {
  try {
    const { data } = await instance.post(`http://54.167.169.43./api/comment/recomment/${commentId}`, {
      comment
    });
    console.log("data:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const delRecomment = async id => {
  const response = await instance.delete(`http://54.167.169.43./api/comment/${id.commentId}/${id.recommentId}`);
  return response.data;
};

export const editRecomment = async ({ comment, recommentId, commentId }) => {
  console.log(comment);
  try {
    const response = await instance.put(`http://54.167.169.43./api/comment/${commentId}/${recommentId}`, {
      comment: comment
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.code);
  }
};
