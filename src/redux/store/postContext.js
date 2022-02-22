import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import actions from '../reducers/actions';
import { useAuthorizationContext } from '.';

const PostContextAPI = createContext();
const postReducer = (state, action) => {
    switch (action.type) {
        case actions.GET_POST_LIST:
            return {
                ...state,
                posts: action.payload,
                postLoading: false,
            };
        case actions.GET_SINGLE_POST:
            return {
            };
        case actions.SET_LOADING:
            return {
                ...state,
                postLoading: true
            };
        case actions.SET_OFF_LOADING:
            return {
                ...state,
                postLoading: false
            };
        default:
            return initialPostPage;
    }
}
const categoryReducer = (state, action) => {
    switch (action.type) {
        case actions.GET_POST_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                categoryLoading: false
            };
        default:
            return initialCategories;
    }
}
const initialPostPage = {
    posts: [],
    postLoading: true,
    page: 0
}
const initialCategories = {
    categories: [],
    categoryLoading: true
}

export default React.memo(function PostContext({ children }) {
    const [postState, setPost] = useReducer(postReducer, initialPostPage);
    const [categoryState, setCategory] = useReducer(categoryReducer, initialCategories);
    const { user } = useAuthorizationContext();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const cancelTokenSource = axios.CancelToken.source();
    const { NODE_ENV } = process.env;
    const postAPI = NODE_ENV === 'development' ? mainAPI.LOCALHOST_STAFF : mainAPI.CLOUD_API_STAFF;

    useEffect(() => {
        getPosts();
        getPostCategories();
        return () => {
            cancelTokenSource.cancel();
        };
    }, [user]);

    async function getPosts() {
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.page
            }
        }).then(res => {
            setPost({
                type: actions.GET_POST_LIST,
                payload: res.data.response.posts
            });
        }).catch(error => setError(error.message));
    }
    async function getPostCategories() {
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'category',
            }
        }).then(res => {
            setCategory({
                type: actions.GET_POST_CATEGORIES,
                payload: res.data.response
            })
        }).catch(error => setError(error.message));
    }
    function postIdea(input) {
        const formData = new FormData();
    }

    const contextValues = {
        posts: postState.posts,
        categories: categoryState.categories,
        postLoading: postState.postLoading,
        categoryLoading: categoryState.categoryLoading
    }

    // if (postState.postLoading || categoryState.categoryLoading) return <Loading></Loading>

    return (<PostContextAPI.Provider value={contextValues}>
        {children}
    </PostContextAPI.Provider>);
});



export const usePostContext = () => {
    return useContext(PostContextAPI);
}