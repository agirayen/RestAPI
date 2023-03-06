import { Request, Response, NextFunction } from 'express';
import axios, {AxiosResponse } from 'axios';

interface Post {
    userId:Number;
    id: Number;
    title: String;
    body: String;
}

//getting all posts
const getPosts = async (req: Request, res:Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    let posts: [Post] = result.data;
    return res.status(200).json({
        message:posts
    });
    
};
// get single post
const getPost= async(req: Request, res:Response, next: NextFunction) => {
// get post id from req
let id: string = req.params.id;
//get post
let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
let post: Post = result.data;
return res.status(200).json({
    message:post
});
};
//update post
const updatePost= async(req:Request, res:Response,next:NextFunction) => {
    //get post id
    let id: string=req.params.id;
    //get data from req body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    //update post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        ...(title && { title }),
        ...(body && { body })
    });
    //return response
    return res.status(200).json({
        message: response.data
    })
}
//deleteing post
const deletePost = async (req:Request, res:Response, next:NextFunction) => {
    //get the post id from req.params
    let id:string = req.params.id;
    //delete post
    let response:AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //return response
    return res.status(200).json({
        message:'post deleted successfully'
    })
}
//adding post
const addPost = async(req:Request, res:Response, next:NextFunction) => {
    // get data from req body
    let title:string = req.body.title;
    let body:string = req.body.body;
    //add post
    let response:AxiosResponse=await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    //return response
    return res.status(200).json({
        message:response.data
    })
}
export default{ getPosts, getPost, updatePost, deletePost, addPost  };