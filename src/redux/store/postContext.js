import React, { createContext, useContext, useState, useEffect, useReducer, useCallback } from 'react'
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
        case actions.UPDATE_SINGLE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        return action.payload
                    }
                })
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
        case actions.SHOW_UPDATE:
            return {
                ...state,
                isUpdated: true
            };
        case actions.LOAD_MORE_POST:
            return {
                ...state,
                posts: state.posts.concat(action.payload),
            };
        case actions.LOAD_MORE_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case actions.LOAD_MY_POST:
            return {
                ...state,
                myPosts: action.payload
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
        case actions.SET_OFF_LOADING:
            return {
                ...state,
                categoryLoading: false
            };
        case actions.SET_LOADING:
            return {
                ...state,
                categoryLoading: true
            };
        case actions.SHOW_UPDATE:
            return {
                ...state,
                isUpdated: true
            };
        default:
            return initialCategories;
    }
}

const initialPostPage = {
    posts: [],
    myPosts: [],
    postLoading: true,
    page: 0
}
const initialCategories = {
    categories: [],
    categoryLoading: true,
}

export default React.memo(function PostContext({ children }) {
    const [postState, setPost] = useReducer(postReducer, initialPostPage);
    const [categoryState, setCategory] = useReducer(categoryReducer, initialCategories);

    const [showUpdate, setShowUpdate] = useState(false);
    const { user } = useAuthorizationContext();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { REACT_APP_ENVIRONMENT } = process.env;
    const [postAPI, host] = REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const cancelTokenSource = axios.CancelToken.source();

    async function getPosts() {
        setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.page,
                count: 3
            }
        }).then(res => {
            setPost({
                type: actions.GET_POST_LIST,
                payload: res.data.response
            });
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    async function updateSinglePost(postId) {
        setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'singlepost',
                postid: postId
            }
        }).then(res => {
            console.log(res.data);
            // setPost({
            //     type: actions.UPDATE_SINGLE_POST,
            //     payload: res.data
            // });
        }).then(success => setPost({
            type: actions.SET_OFF_LOADING
        })).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        })
    }
    async function loadNextPosts() {
        setPost({
            type: actions.LOAD_MORE_PAGE
        });
        return getPosts;
    }
    async function getPostCategories() {
        setCategory({
            type: actions.SET_LOADING
        });
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
            });
        }).catch(error => {
            setCategory({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        })
    }
    const postIdea = (input, cb, options = null) => {
        // Create form submission for post and upload files
        const formData = new FormData();
        // Deflat input file to single file array for appending to formdata for uploading
        input.files
            .reduce((p, c) => ([...p, c.file]), [])
            .forEach(file => {
                formData.append("files", file);
            });
        // Append post body to form data
        Object.keys(input).forEach(key => {
            if (Array.isArray(input[key])) {
                input[key].forEach(item => {
                    formData.append(key, item);
                })
                return;
            }
            formData.append(key, input[key]);
        })
        // Check if the postIdea options are pass with edit copyright
        if (options?.isEdit)
            return axios.put(postAPI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                params: {
                    view: 'post',
                    postid: options.id
                }
            }).then(res => {
                setShowUpdate(!showUpdate);
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
            setShowUpdate(!showUpdate);
            cb(res);
        }).catch(err => setError(err.message));
    }
    const removeIdea = (id) => {
        return axios.delete(postAPI, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.accessToken}`
            },
            params: {
                view: 'post',
                postid: id
            }
        }).then(res => {
            setShowUpdate(!showUpdate);
            // cb(res);
        }).catch(error => setError(error.message));
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
        })).then(data => cb(data)).catch(error => setError(error.message));
    }
    async function getPostComments(postId) {
        setPost({
            type: actions.SET_LOADING
        });

        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'comment',
                postid: postId
            }
        }).then(res => {
            console.log(res.data);
            return setPost({
                type: actions.GET_COMMENT
            })
        }).then(success => {
            return setPost({
                type: actions.SET_OFF_LOADING
            })
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        })
    }
    function interactPost(postId, type = 'like', input) {
        // Set Loading for waiting post
        setPost({
            type: actions.SET_LOADING
        });

        if (type === 'like')
            return axios.put(postAPI, {
            }, {});
        else if (type === 'dislike')
            return axios.put(postAPI, {}, {});
        else if (type === 'comment') {
            console.log('im comment');
            return axios.put(postAPI, {
                content: input.content
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                params: {
                    view: 'comment',
                    postid: postId
                }
            }).then(res => {
                console.log(res.data);
                return setShowUpdate(!showUpdate);
            }).catch(error => {
                setPost({
                    type: actions.SET_OFF_LOADING
                });
                setError(error.message);
            });
        }
    }
    function filterPost(e) {
        const filterValue = e.target.value;
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.page,
                count: 3,
                filter: filterValue
            }
        }).then(res => setPost({
            type: actions.GET_POST_LIST,
            payload: res.data.response
        })).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    async function getGzipFile() {
    }
    async function getOwnPosts() {
        setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.page,
                count: 5,
                filter: 2
            }
        }).then(res => setPost({
            type: actions.LOAD_MY_POST,
            payload: res.data.response
        })).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }

    useEffect(() => {
        getPosts();
        getPostCategories();
        return () => {
            cancelTokenSource.cancel();
        };
    }, [user, showUpdate, postState.page]);

    // useEffect(() => {
    //     console.log(postState);
    // }, [postState]);

    const contextValues = {
        posts: postState.posts,
        myPosts: postState.myPosts,
        categories: categoryState.categories,
        postLoading: postState.postLoading,
        categoryLoading: categoryState.categoryLoading,
        message,
        error,
        setMessage,
        setError,
        getFile,
        postIdea,
        updateSinglePost,
        removeIdea,
        loadNextPosts,
        filterPost,
        interactPost,
        getGzipFile,
        getOwnPosts,
        getPostComments
    }

    if (postState.postLoading && categoryState.categoryLoading) return <Loading className="post__loading"></Loading>

    return (<PostContextAPI.Provider value={contextValues}>
        {children}
    </PostContextAPI.Provider>);
});



export const usePostContext = () => {
    return useContext(PostContextAPI);
}