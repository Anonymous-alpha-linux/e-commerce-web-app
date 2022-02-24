import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import actions from '../reducers/actions';
import { useAuthorizationContext } from '.';
import { Loading } from '../../pages';

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
    // const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { REACT_APP_ENVIRONMENT } = process.env;
    const [postAPI, host] = REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const cancelTokenSource = axios.CancelToken.source();
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
    function postIdea(input, cb, ...options) {
        const formData = new FormData();
        input.files.reduce((p, c) => ([...p, c.file]), []).forEach(file => {
            formData.append("files", file);
        });
        Object.keys(input).forEach(key => {
            if (Array.isArray(input[key])) {
                input[key].forEach(item => {
                    formData.append(key, item);
                })
                return;
            }
            formData.append(key, JSON.stringify(input[key]));
        })
        if (options.isEdit) return axios.put(postAPI, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'post',
                postid: options.id
            }
        }).then(res => {
            cb(res);
        }).catch(error => setError(error.message));

        return axios.post(postAPI, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'post'
            }
        }).then(res => {
            // getSocket().emit("notify post", {
            //     postId: res.data.postId,
            //     postURL: `/post/${res.data.postId}`
            // })
            cb(res);
        }).catch(err => setError(err.message));
    }
    async function getFile(attachment, cb) {
        await axios.get(`${host}\\${attachment.filePath}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.accessToken}`
            },
            responseType: 'blob'
        }).then(res => {
            return res.data;
        }).then(blob => new File([blob], attachment.fileName, {
            type: attachment.fileType
        })).then(data => cb(data)).catch(error => console.log(error.message));
    }
    // async function getGzipFile() {
    // }

    const contextValues = {
        posts: postState.posts,
        categories: categoryState.categories,
        postLoading: postState.postLoading,
        categoryLoading: categoryState.categoryLoading,
        getFile,
        postIdea
    }
    if (postState.postLoading || categoryState.categoryLoading) return <Loading
        className="post__loading"></Loading>

    return (<PostContextAPI.Provider value={contextValues}>
        {children}
    </PostContextAPI.Provider>);
});



export const usePostContext = () => {
    return useContext(PostContextAPI);
}