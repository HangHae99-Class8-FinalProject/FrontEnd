import axios from "axios"
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from "../Utils/Instance";

 const addReply = async (reply) =>{
    return await instance.post('http://localhost:8000/Comment',reply)
}

const delReply = async (reply) =>{
    return await instance.delete('http://localhost:8000/Comment',reply)
}



export const addReplyData = () =>{
    const queryClient = useQueryClient();

    return useMutation(addReply,{
        onSuccess: () =>{
            queryClient.invalidateQueries('GET_REPLY')
        }
    });
}



export const delReplyData = () =>{
    const queryClient = useQueryClient();

    return useMutation(delReply,{
        onSuccess: () =>{
            queryClient.invalidateQueries('DEL_REPLY')
        }
    });
}