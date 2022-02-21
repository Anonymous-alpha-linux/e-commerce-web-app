import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import { useAuthorizationContext } from '..';

const PostContextAPI = createContext();
const postReducer = (state, action) => {

}

const initialPostPage = {
    posts: [],
    postLoading: true,
    page: 0,
    mainAPI: 
}

export default function PostContext({ children }) {
    const [postState, dispatchPost] = useReducer(postReducer, initialPostPage);
    const { user } = useAuthorizationContext();

    function getPosts() {
        const postAPI = `${mainAPI.CLOUD_API_STAFF}?view=post`;
        axios.get(postAPI).then(res => {

        })
    }

    return (
        <PostContextAPI.Provider value={{
            postState
        }}>
            {children}
        </PostContextAPI.Provider>
    )
}


export const useUserContext = () => {
    return useContext(PostContextAPI);
}