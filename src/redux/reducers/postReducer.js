import actions from './actions';

export const initialPostPage = {
    posts: [],
    myPosts: [],
    postLoading: true,
    page: 0,
    myPage: 0,
    more: true,
    filter: 0
}
const postReducer = (state, action) => {
    switch (action.type) {
        /*
               1. action.payload: [Array],
               2. action.page: [Number],
               3. action.filter: [Number]
               4. action.postid: [String]
               5. action.commentid: [String]
           */
        case actions.GET_POST_LIST:
            return {
                ...state,
                posts: action.payload,
                postLoading: false,
                filter: 0,
                page: 0
            };
        case actions.LOAD_MORE_POST:
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
            console.log(action.payload)
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload.postid) {
                        return {
                            ...post,
                            ...action.payload.data
                        };
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
        case actions.UPDATE_MY_POST:
            return {
                ...state,
                myPosts: action.payload,
                myPage: 0
            };

        case actions.GET_POST_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: action.payload,
                            page: 0,
                            filter: 0,
                            count: 10,
                            loadMore: action.payload.length >= 10
                        }
                    }
                    return post;
                }),
                myPosts: state.myPosts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: action.payload,
                            page: 0,
                            filter: 0,
                            count: 10,
                            loadMore: action.payload.length >= 10
                        }
                    }
                    return post;
                })
            };
        case actions.LOAD_MORE_POST_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: action.payload.length ? [...post.comments, ...action.payload] : post.comments,
                            page: action.payload.length ? post.page + 1 : post.page,
                            loadMore: action.payload.length >= post.count
                        }
                    }
                    return post;
                }),
                myPosts: state.myPosts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: action.payload.length ? [...post.comments, ...action.payload] : post.comments,
                            page: 0,
                            loadMore: action.payload.length >= 10
                        }
                    }
                    return post;
                }),
            };
        case actions.FILTER_POST_COMMENT:
            console.log(state.posts);
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        console.log('filter post comment');
                        console.log(action, post);
                        return {
                            ...post,
                            comments: action.payload,
                            page: 0,
                            filter: action.filter,
                            loadMore: true
                        }
                    }
                    return post;
                }),
                myPosts: state.myPosts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: action.payload,
                            page: 0,
                            filter: action.filter,
                            loadMore: true
                        }
                    }
                    return post;
                })
            };
        case actions.UPDATE_POST_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: post.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        ...action.payload
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                }),
                myPosts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: post.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        ...action.payload
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                }),
            };
        case actions.CREATE_POST_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: [action.payload, ...post.comments],
                        }
                    }
                    return post;
                })
            };


        case actions.GET_COMMENT_REPLIES:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid)
                                    return {
                                        ...comment,
                                        replies: action.payload,
                                        page: 0,
                                        filter: 0,
                                        count: 10,
                                        loadMore: action.payload.length >= 10
                                    }
                                return comment;
                            })

                        }
                    }
                    return post;
                }),
                myPosts: state.myPosts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid)
                                    return {
                                        ...comment,
                                        replies: action.payload,
                                        page: 0,
                                        filter: 0,
                                        count: 10,
                                        loadMore: action.payload.length >= 10
                                    }
                                return comment;
                            })
                        }
                    }
                    return post;
                })
            };
        case actions.LOAD_MORE_COMMENT_REPLIES:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        replies: action.payload.length ? [...post.comments, ...action.payload] : comment.replies,
                                        page: action.payload.length ? post.page + 1 : post.page,
                                        loadMore: action.payload.length >= post.count
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                }),
                myPosts: state.myPosts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        replies: action.payload.length ? [...post.comments, ...action.payload] : comment.replies,
                                        page: action.payload.length ? post.page + 1 : post.page,
                                        loadMore: action.payload.length >= post.count
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                }),
            };
        case actions.ADD_COMMENT_REPLY:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        replies: [action.payload, ...post.replies]
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
                })
            };
        case actions.UPDATE_COMMENT_REPLY:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.postid) {
                        return {
                            ...post,
                            comments: state.comments.map(comment => {
                                if (comment._id === action.commentid) {
                                    return {
                                        ...comment,
                                        replies: comment.replies.map(reply => {
                                            if (reply._id === action.payload._id) {
                                                return {
                                                    ...reply,
                                                    ...action.payload
                                                }
                                            }
                                            return reply;
                                        })
                                    }
                                }
                                return comment;
                            })
                        }
                    }
                    return post;
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
        case actions.LOAD_MORE_PAGE:
            return {
                ...state,
                page: state.page + 1
            };

        default:
            return initialPostPage;
    }
}
export default postReducer;