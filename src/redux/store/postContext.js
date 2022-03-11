import React, { createContext, useContext, useState, useEffect, useReducer, useRef } from 'react'
import axios from 'axios';
import { mainAPI } from '../../config';
import actions from '../reducers/actions';
import { useAuthorizationContext } from '.';
import { Loading } from '../../pages';
import { postReducer, initialPostPage } from '../reducers';
import { notifyData, socketTargets } from '../../fixtures';
import { useNotifyContext } from '..';
const PostContextAPI = createContext();

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
const initialCategories = {
  categories: [],
  categoryLoading: true,
}
export default React.memo(function PostContext({ children }) {
  // Component states
  const [postState, setPost] = useReducer(postReducer, initialPostPage);
  const [categoryState, setCategory] = useReducer(categoryReducer, initialCategories);
  const [showUpdate, setShowUpdate] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const mountedRef = useRef(false);
  // Global states getter
  const { user } = useAuthorizationContext();
  const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    getPosts();
    getPostCategories();
    return () => {
      cancelTokenSource.cancel();
    }
  }, [user]);
  // 1. Post for workspace
  function getPosts() {
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
        count: postState.count,
        filter: 0
      }
    }).then(res => {
      setPost({
        type: actions.SET_OFF_LOADING
      });
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
  function getSinglePost(postId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'singlepost',
        postid: postId
      }
    }).then(post => {
      cb(post.data.response);
    }).catch(error => {
      setError(error.message);
    });
  }
  function createSinglePost(postId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'singlepost',
        postid: postId
      }
    }).then(res => {
      setPost({
        type: actions.PUSH_IDEA,
        payload: [res.data.response]
      });
    }).catch(error => {
      setError(error.message);
    });
  }
  function updateSinglePost(postId, cb) {
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
        payload: res.data.response
      })
    }).catch(error => {
      setError(error.message);
    })
  }
  function postIdea(input, cb, options = null) {
    // Create form submission for post and upload files
    const formData = new FormData();
    // Deflat input file to single file array for appending to formdata for uploading
    input.files
      .reduce((p, c) => ([...p, c.file]), []).forEach(file => {
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
    });
    // Check if the postIdea options are pass with edit copyright
    if (options?.isEdit) {
      editIdea(input, cb, options);
    }
    return axios.post(postAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'post',
        postid: input.postid
      }
    }).then(res => {
      cb(res.data.response[0]._id);
      return createSinglePost(res.data.response[0]._id, cb)
    }).catch(err => {
      cb(error);
      setError(err.message);
    });
  };
  function editIdea(input, cb, options) {
    // Create form submission for post and upload files
    const formData = new FormData();
    // Deflat input file to single file array for appending to formdata for uploading
    input.files.reduce((p, c) => ([...p, c.file]), []).forEach(file => {
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
    });
    return axios.put(postAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'post',
        postid: options.postId
      }
    }).then(res => {
      setPost({
        type: actions.UPDATE_SINGLE_POST,
        postId: options.postId,
        payload: res.data.response[0]
      })
      cb(res);
    }).catch(error => setError(error.message));
  }
  // async function updateSinglePost(postId, cb) {
  //   return axios.get(postAPI, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  //     },
  //     params: {
  //       view: 'singlepost',
  //       postid: postId
  //     }
  //   }).then(res => {
  //     console.log(res.data.response);
  //     return setPost({
  //       type: actions.UPDATE_SINGLE_POST,
  //       payload: {
  //         postid: postId,
  //         data: res.data.response
  //       }
  //     });
  //   }).then(success => {
  //     cb();
  //   }).catch(error => {
  //     setError(error.message);
  //   })
  // }

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
    }).then(res => {
      return setPost({
        type: actions.GET_MY_POST,
        payload: res.data.response
      })
    }).then(success => {
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

  // 3. Comment for posts
  async function getPostComments(postId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'comment',
        postid: postId,
        page: 0,
        count: 10
      }
    }).then(res => {
      return setPost({
        type: actions.GET_POST_COMMENT,
        payload: res.data.response,
        postid: postId,
        count: 10
      });
    }).then(success => {
      cb();
    }).catch(error => {
      setError(error.message);
    });
  }
  function filterPostComment(postId, filter) {
    const { count } = postState.posts.find(post => post._id === postId);
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'comment',
        postid: postId,
        page: 0,
        count: count,
        filter: filter
      }
    }).then(res => {
      return setPost({
        type: actions.FILTER_POST_COMMENT,
        payload: res.data.response,
        postid: postId,
        filter: filter
      });
    }).catch(error => {
      setError(error.message);
    });
  }
  function loadNextComments(postId) {
    const { page, filter, count } = postState.posts.find(post => post._id === postId);
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'comment',
        postid: postId,
        page: page + 1,
        count: count,
        filter: filter
      }
    }).then(res => {
      return setPost({
        type: actions.LOAD_MORE_POST_COMMENT,
        payload: res.data.response,
        postid: postId
      })
    }).catch(error => {
      setPost({
        type: actions.SET_OFF_LOADING
      });
      setError(error.message);
    });
  }
  function updateSingleComment(postId, commentId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'singlecomment',
        postid: postId,
        commentid: commentId
      }
    }).then(res => {
      return setPost({
        type: actions.UPDATE_POST_COMMENT,
        payload: res.data.response,
        postid: postId,
        commentid: commentId
      });
    }).then(success => {
      cb();
    }).catch(error => {
      setPost({
        type: actions.SET_OFF_LOADING
      });
      setError(error.message);
    });
  }
  function addSingleComment(postId, commentId) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'singlecomment',
        postid: postId,
        commentid: commentId
      }
    }).then(res => {
      const { _id } = res.data.response;
      setPost({
        type: actions.CREATE_POST_COMMENT,
        payload: res.data.response,
        postid: postId
      });
    }).catch(error => {
      setError(error.message);
    });
  }

  // 4. Reply for comments
  function getCommentReplies(postId, commentId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'reply',
        commentid: commentId,
        page: 0,
        count: 10
      }
    }).then(res => {

      return setPost({
        type: actions.GET_COMMENT_REPLIES,
        payload: res.data.response,
        postid: postId,
        commentid: commentId,
        count: 10
      });
    }).then(success => {
      cb();
    }).catch(error => {
      setError(error.message);
    });
  }
  function loadNextReplies(postId, commentId, cb) {
    return;
  }
  function updateCommentReplies(postId, commentId, cb) {
    return;
  }
  function addCommentReply(postId, commentId, cb) {
    return axios.get(postAPI, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      params: {
        view: 'singlecomment',
        commentid: commentId,
        page: 0,
        count: 10
      }
    }).then(res => {
      return setPost({
        type: actions.ADD_COMMENT_REPLY,
        payload: res.data.response.replies,
        postid: postId,
        commentid: commentId,
      });
    }).then(success => {
      cb();
    }).catch(error => {
      setError(error.message);
    });;
  }
  // 4. Thump-up, thump-down, comment 
  function interactPost(postId, type, input, cb) {
    // Set Loading for waiting post
    if (type === 'rate') {
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
        // updateSinglePost(postId, cb);
      }).catch(error => {
        setError(error.message);
      })
    }
    else if (type === 'comment') {
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
        cb(res.data.response._id);
        addSingleComment(postId, res.data.response._id);
      }).catch(error => {
        setError(error.message);
      });
    }
    else if (type === 'rate comment') {
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
        return updateSingleComment(postId, input.commentId, cb);
      }).catch(error => {
        setError(error.message);
      })
    }
    else if (type === 'reply comment') {
      return axios.put(postAPI, {
        content: input.content,
        private: input.private
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        params: {
          view: 'comment',
          commentid: input.commentid,
          interact: 'reply'
        }
      }).then(res => {
        return addCommentReply(postId, res.data.response._id, () => {
          cb();
        });
      }).then(success => {
        cb();
      }).catch(error => {
        setError(error.message);
      });
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
    await axios.get(`${attachment.online_url || attachment.filePath}`, {
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
    getSinglePost,
    // updateSinglePost,
    removeIdea,
    loadNextPosts,
    loadMyNextPosts,
    // loadNextPage,
    filterPost,
    filterMyPost,
    interactPost,
    getGzipFile,
    getOwnPosts,
    getPostComments,
    loadNextComments,
    filterPostComment,
    getCommentReplies,
  }

  if (postState.postLoading && categoryState.categoryLoading) return <Loading className="post__loading"></Loading>

  return (<PostContextAPI.Provider value={contextValues}>
    {children}
  </PostContextAPI.Provider>);
});
export const usePostContext = () => {
  return useContext(PostContextAPI);
}
