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
                filter: 0,
                page: 0
            };
        case actions.LOAD_MORE_POST:
            console.log(!!action.payload.length);
            return {
                ...state,
                posts: action.payload.length ? state.posts.concat(action.payload) : state.posts,
                page: action.payload.length ? state.page + 1 : state.page
            };
        case actions.FILTER_POST_LIST:
            return {
                ...state,
                filter: action.filter,
                postLoading: false,
                posts: action.payload,
                page: 0
            };
        case actions.UPDATE_SINGLE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload.postid) {
                        return action.payload.data;
                    }
                    return post;
                })
            };

        case actions.GET_MY_POST:
            return {
                ...state,
                myPosts: action.payload,
                myPage: 0,
                filter: 2
            };
        case actions.LOAD_MORE_MY_POST:
            return {
                ...state,
                myPosts: action.payload.length ? state.myPosts.concat(action.payload) : state.myPosts,
                myPage: action.payload.length ? state.myPage + 1 : state.myPage
            };
        case actions.FILTER_MY_POST:
            return {
                ...state,
                myPosts: action.payload,
                myPage: 0,
                filter: action.filter
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
        case actions.LOAD_MORE_PAGE:
            return {
                ...state,
                page: state.page + 1
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
    page: 0,
    myPage: 0,
    more: true,
    filter: 0
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

    // 1. Post for workspace
    async function getPosts() {
        await setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: 0,
                count: 3,
                filter: 0
            }
        }).then(res => {
            return setPost({
                type: actions.GET_POST_LIST,
                payload: res.data.response,
            });
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    function filterPost(filter) {
        setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: 0,
                count: 3,
                filter: filter
            }
        }).then(res => {
            return setPost({
                type: actions.FILTER_POST_LIST,
                payload: res.data.response,
                filter: filter
            });
        }).then(success => {
            // console.log(postState);
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    async function loadNextPosts(cb) {
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.page + 1,
                count: 3,
                filter: postState.filter
            }
        }).then(res => {
            return setPost({
                type: actions.LOAD_MORE_POST,
                payload: res.data.response
            });
        }).then(success => {
            cb();
        }).catch(error => {
            setError(error.message);
        });
    }
    // 2. Posts for profile
    function getOwnPosts(cb) {
        setPost({
            type: actions.SET_LOADING
        });
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: 0,
                count: 3,
                filter: 2
            }
        }).then(res => setPost({
            type: actions.GET_MY_POST,
            payload: res.data.response
        })).then(success => {
            cb();
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    function filterMyPost(filter) {
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: 0,
                count: 3,
                filter: filter
            }
        }).then(res => {
            return setPost({
                type: actions.FILTER_MY_POST,
                payload: res.data.response,
                filter: filter
            });
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
    }
    function loadMyNextPosts(cb) {
        return axios.get(postAPI, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: {
                view: 'post',
                page: postState.myPage + 1,
                count: 3,
                filter: postState.filter
            }
        }).then(res => setPost({
            type: actions.LOAD_MORE_MY_POST,
            payload: res.data.response
        })).then(success => {
            cb();
        }).catch(error => {
            setPost({
                type: actions.SET_OFF_LOADING
            });
            setError(error.message);
        });
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
    async function loadNextPage(cb) {
        setPost({
            type: actions.LOAD_MORE_PAGE
        });
        cb();
    }
    // 3. Update a post 
    async function updateSinglePost(postId, cb) {
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
            return setPost({
                type: actions.UPDATE_SINGLE_POST,
                payload: {
                    postid: postId,
                    data: res.data.response
                }
            });
        }).then(success => {
            cb();
        }).catch(error => {
            setError(error.message);
        })
    }

    // 4. Thump-up, thump-down, comment 
    function interactPost(postId, type, input, cb) {
        // Set Loading for waiting post
        setPost({
            type: actions.SET_LOADING
        });

        if (type === 'rate') {
            console.log(postId, type, input);
            return axios.put(postAPI, {
                isLiked: input.liked,
                isDisliked: input.disliked
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                params: {
                    view: 'post',
                    postid: postId,
                    interact: 'rate'
                }
            }).then(res => {
                console.log(res);
                return updateSinglePost(postId, cb);
            }).catch(error => {
                setPost({
                    type: actions.SET_OFF_LOADING
                });
                setError(error.message);
            })
        }
        else if (type === 'comment') {
            console.log(postId, type, input);
            return axios.post(postAPI, {
                content: input.content,
                private: input.private
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                params: {
                    view: 'comment',
                    postid: postId
                }
            }).then(res => {
                return updateSinglePost(postId, cb);
            }).then(success => {
                cb();
            }).catch(error => {
                setPost({
                    type: actions.SET_OFF_LOADING
                });
                setError(error.message);
            });
        }
        else if (type === 'rate comment') {
            console.log(postId, type, input);
            return axios.put(postAPI, {
                isLiked: input.liked,
                isDisliked: input.disliked
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                params: {
                    view: 'comment',
                    commentid: input.commentId,
                    interact: 'rate'
                }
            }).then(res => {
                console.log(res);
                return updateSinglePost(postId, cb);
            }).catch(error => {
                setPost({
                    type: actions.SET_OFF_LOADING
                });
                setError(error.message);
            })
        }
    }

    // 5. Get the list of categories
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

    // 6. Post new Idea
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
    // 7. Delete idea
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

    // 8. Plug-ins
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

    function getGzipFile() {
    }

    useEffect(() => {
        getPosts();
        getPostCategories();

        return () => {
            cancelTokenSource.cancel();
        };
    }, [user, showUpdate]);
    // useEffect(() => {
    //     console.log(postState)
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
        setShowUpdate,
        getFile,
        postIdea,
        updateSinglePost,
        removeIdea,
        loadNextPosts,
        loadMyNextPosts,
        loadNextPage,
        filterPost,
        filterMyPost,
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