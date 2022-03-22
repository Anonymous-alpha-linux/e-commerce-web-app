import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";
import axios from "axios";
import { mainAPI } from "../../config";
import actions from "../reducers/actions";
import { useAuthorizationContext } from ".";
import { Loading } from "../../pages";
import { postReducer, initialPostPage } from "../reducers";
import { notifyData, socketTargets } from "../../fixtures";
import { useNotifyContext } from "..";
const PostContextAPI = createContext();

const categoryReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_POST_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        categoryLoading: false,
      };
    case actions.SET_OFF_LOADING:
      return {
        ...state,
        categoryLoading: false,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        categoryLoading: true,
      };
    case actions.SHOW_UPDATE:
      return {
        ...state,
        isUpdated: true,
      };
    case actions.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case actions.REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    default:
      return initialCategories;
  }
};
const initialCategories = {
  categories: [],
  categoryLoading: true,
};
export default React.memo(function PostContext({ children }) {
  // Component states
  const [postState, setPost] = useReducer(postReducer, initialPostPage);
  const [categoryState, setCategory] = useReducer(
    categoryReducer,
    initialCategories
  );
  const [showUpdate, setShowUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Global states getter
  const { user, socket } = useAuthorizationContext();
  const [postAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    getPosts();
    getPostCategories();
    return () => {
      cancelTokenSource.cancel();
    };
  }, [user]);
  useEffect(() => {
    receiveRealtimeComment();
    receiveRealTimeLike();
    receiveRealTimeDisLike();
    receiveRealtimeCommentReply();
  }, [socket]);
  // 1. Post for workspace
  function getPosts() {
    setPost({
      type: actions.SET_LOADING,
    });
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: 0,
          count: postState.count,
          filter: 0,
        },
      })
      .then((res) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        return setPost({
          type: actions.GET_POST_LIST,
          payload: res.data.response,
        });
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function filterPost(filter) {
    setPost({
      type: actions.SET_LOADING,
    });
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: 0,
          count: 3,
          filter: filter,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.FILTER_POST_LIST,
          payload: res.data.response,
          filter: filter,
        });
      })
      .then((success) => {})
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function loadNextPosts(cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: postState.page + 1,
          count: 3,
          filter: postState.filter,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.LOAD_MORE_POST,
          payload: res.data.response,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function getSinglePost(postId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlepost",
          postid: postId,
        },
      })
      .then((post) => {
        return cb(post.data.response);
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function createSinglePost(postId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlepost",
          postid: postId,
        },
      })
      .then((res) => {
        setPost({
          type: actions.PUSH_IDEA,
          payload: [res.data.response],
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function updateSinglePost(postId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlepost",
          postid: postId,
        },
      })
      .then((res) => {
        setPost({
          type: actions.UPDATE_SINGLE_POST,
          payload: res.data.response,
          postId: postId,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function deleteSinglePost(postId, cb) {
    return axios
      .delete(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          postid: postId,
        },
      })
      .then((res) => {
        setPost({
          type: actions.REMOVE_SINGLE_POST,
          postId: postId,
        });
        cb(postId);
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function postIdea(input, cb, options = null) {
    // Create form submission for post and upload files
    const formData = new FormData();
    // Deflat input file to single file array for appending to formdata for uploading
    input.files
      .reduce((p, c) => [...p, c.file], [])
      .forEach((file) => {
        formData.append("files", file);
      });
    // Append post body to form data
    Object.keys(input).forEach((key) => {
      if (Array.isArray(input[key])) {
        input[key].forEach((item) => {
          formData.append(key, item);
        });
        return;
      }
      formData.append(key, input[key]);
    });
    // Check if the postIdea options are pass with edit copyright
    if (options?.isEdit) {
      return editIdea(input, formData, cb, options);
    }
    return axios
      .post(postAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          // postid: input.postid,
        },
      })
      .then((res) => {
        createSinglePost(res.data.response[0]._id, cb);
        cb(res.data.response[0]._id);
      })
      .catch((err) => {
        cb(error);
        setError(err.message);
      });
  }
  function editIdea(input, formData, cb, options) {
    // Create form submission for post and upload files
    // const formData = new FormData();
    // Deflat input file to single file array for appending to formdata for uploading
    // input.files
    // .reduce((p, c) => [...p, c.file], [])
    // .forEach((file) => {
    //   formData.append("files", file);
    // });
    // Append post body to form data
    // Object.keys(input).forEach((key) => {
    //   if (Array.isArray(input[key])) {
    //     input[key].forEach((item) => {
    //       formData.append(key, item);
    //     });
    //     return;
    //   }
    //   formData.append(key, input[key]);
    // });
    return axios
      .put(postAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          postid: options.postId,
        },
      })
      .then((res) => {
        console.log(res.data.response);
        updateSinglePost(res.data.response[0]._id);
        cb(res.data.response[0]._id);
      })
      .catch((error) => setError(error.message));
  }
  function likePost(isLiked, postId, userId) {
    let isDisliked = postState;
    // .dislikedAccounts.includes(user.accountId);
    if (!isDisliked) {
      setPost({
        type: actions.LIKE_POST,
        postId,
        userId,
        isLiked,
      });
    } else {
      setPost({
        type: actions.LIKE_POST,
        postId,
        userId,
        isLiked,
      });
      setPost({
        type: actions.DISLIKE_POST,
        postId,
        userId,
        isLiked,
      });
    }
  }
  function sendRealTimeLike(postId, userId) {
    socket.emit("like post", {
      postId,
      userId,
    });
  }
  function receiveRealTimeLike() {
    socket.on("like post", (data) => {
      const { postId, userId } = data;
      updateSinglePost(postId);
    });
  }
  function dislikePost(isDisliked, postId, userId) {
    setPost({
      type: actions.DISLIKE_POST,
      postId,
      userId,
      isDisliked,
    });
  }
  function sendRealTimeDisLike(postId, userId) {
    socket.emit("dislike post", {
      postId,
      userId,
    });
  }
  function receiveRealTimeDisLike() {
    socket.on("dislike post", (data) => {
      const { postId, userId } = data;
      updateSinglePost(postId);
    });
  }

  function likeComment(isLiked, postId, userId, commentId) {
    setPost({
      type: actions.LIKE_COMMENT,
      postId,
      userId,
      commentId,
      isLiked,
    });
  }
  function dislikeComment(isDisliked, postId, userId, commentId) {
    setPost({
      type: actions.LIKE_COMMENT,
      postId,
      userId,
      commentId,
      isDisliked,
    });
  }
  // 2. Posts for profile
  function getOwnPosts(cb) {
    setPost({
      type: actions.SET_LOADING,
    });
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: 0,
          count: 3,
          filter: 2,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.GET_MY_POST,
          payload: res.data.response,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function filterMyPost(filter) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: 0,
          count: 3,
          filter: filter,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.FILTER_MY_POST,
          payload: res.data.response,
          filter: filter,
        });
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function loadMyNextPosts(cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          page: postState.myPage + 1,
          count: 3,
          filter: postState.filter,
        },
      })
      .then((res) =>
        setPost({
          type: actions.LOAD_MORE_MY_POST,
          payload: res.data.response,
        })
      )
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }

  // 3. Comment for posts
  function getPostComments(postId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "comment",
          postid: postId,
          page: 0,
          count: 10,
        },
      })
      .then((res) => {
        setPost({
          type: actions.GET_POST_COMMENT,
          payload: res.data.response,
          postId: postId,
          count: 10,
        });
        cb(res.data.response);
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function filterPostComment(postId, filter) {
    const { count } = postState.posts.find((post) => post._id === postId);
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "comment",
          postid: postId,
          page: 0,
          count: count,
          filter: filter,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.FILTER_POST_COMMENT,
          payload: res.data.response,
          postid: postId,
          filter: filter,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function loadNextComments(postId) {
    const { page, filter, count } = postState.posts.find(
      (post) => post._id === postId
    );
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "comment",
          postid: postId,
          page: page + 1,
          count: count,
          filter: filter,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.LOAD_MORE_POST_COMMENT,
          payload: res.data.response,
          postid: postId,
        });
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function sendRealtimeComment(postId, commentId) {
    socket.emit("comment", {
      postId,
      commentId,
    });
  }
  function receiveRealtimeComment() {
    socket.on("comment", (res) => {
      const { postId, commentId } = res;
      addSingleComment(postId, commentId);
    });
  }
  function updateSingleComment(postId, commentId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlecomment",
          postid: postId,
          commentid: commentId,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.UPDATE_POST_COMMENT,
          payload: res.data.response,
          postId: postId,
          commentId: commentId,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function addSingleComment(postId, commentId) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlecomment",
          postid: postId,
          commentid: commentId,
        },
      })
      .then((res) => {
        const { _id } = res.data.response;
        setPost({
          type: actions.CREATE_POST_COMMENT,
          payload: [res.data.response],
          postId: postId,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // 4. Reply for comments
  function getCommentReplies(postId, commentId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "comment reply",
          commentid: commentId,
          page: 0,
          count: 10,
        },
      })
      .then((res) => {
        setPost({
          type: actions.GET_COMMENT_REPLIES,
          payload: res.data.response,
          postId: postId,
          commentId: commentId,
          count: 10,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function loadNextReplies(postId, commentId, cb) {
    const replyPage = postState.posts
      .find((post) => post._id === postId)
      .comments.find((comment) => comment._id === commentId).page;

    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "comment reply",
          commentid: commentId,
          page: replyPage + 1,
          count: 10,
        },
      })
      .then((res) => {
        setPost({
          type: actions.LOAD_MORE_COMMENT_REPLIES,
          payload: res.data.response,
          postId: postId,
          commentId: commentId,
          count: 10,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  function sendRealtimeCommentReply(postId, commentId, replyId) {
    socket.emit("reply comment", {
      postId,
      commentId,
      replyId,
    });
  }
  function receiveRealtimeCommentReply() {
    socket.on("reply comment", (res) => {
      const { postId, commentId, replyId } = res;
      addCommentReply(postId, commentId, replyId);
    });
  }
  function updateCommentReply(postId, commentId, replyId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlecomment",
          postid: postId,
          commentid: replyId,
        },
      })
      .then((res) => {
        return setPost({
          type: actions.UPDATE_COMMENT_REPLY,
          payload: res.data.response,
          postId: postId,
          commentId: commentId,
          replyId: replyId,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setPost({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  function addCommentReply(postId, commentId, replyId, cb) {
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "singlecomment",
          commentid: replyId,
        },
      })
      .then((res) => {
        setPost({
          type: actions.ADD_COMMENT_REPLY,
          payload: [res.data.response],
          postId: postId,
          commentId: commentId,
        });
      })
      .then((success) => {
        cb();
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  // 4. Thump-up, thump-down, comment
  function interactPost(postId, type, input, cb) {
    // Set Loading for waiting post
    if (type === "rate") {
      return axios
        .put(
          postAPI,
          {
            isLiked: input.liked,
            isDisliked: input.disliked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "post",
              postid: postId,
              interact: "rate",
            },
          }
        )
        .then((res) => {
          const { liked, disliked } = input;
          likePost(liked, postId, user.accountId);
          dislikePost(disliked, postId, user.accountId);
          sendRealTimeLike(liked, postId, user.accountId);
          sendRealTimeDisLike(disliked, postId, user.accountId);
          // updateSinglePost(postId);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "like") {
      return axios
        .put(
          postAPI,
          {
            isLiked: input.liked,
            isDisliked: input.disliked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "post",
              postid: postId,
              interact: "rate",
            },
          }
        )
        .then((res) => {
          const { liked, disliked } = input;
          sendRealTimeLike(postId, user.accountId);
          updateSinglePost(postId);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "dislike") {
      return axios
        .put(
          postAPI,
          {
            isLiked: input.liked,
            isDisliked: input.disliked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "post",
              postid: postId,
              interact: "rate",
            },
          }
        )
        .then((res) => {
          const { liked, disliked } = input;
          sendRealTimeDisLike(postId, user.accountId);
          updateSinglePost(postId);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "comment") {
      return axios
        .post(
          postAPI,
          {
            content: input.content,
            private: input.private,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "comment",
              postid: postId,
            },
          }
        )
        .then((res) => {
          addSingleComment(postId, res.data.response._id);
          sendRealtimeComment(postId, res.data.response._id);
          cb(res.data.response._id);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "rate comment") {
      return axios
        .put(
          postAPI,
          {
            isLiked: input.liked,
            isDisliked: input.disliked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "comment",
              commentid: input.commentId,
              interact: "rate",
            },
          }
        )
        .then((res) => {
          updateSingleComment(postId, input.commentId, cb);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "reply comment") {
      return axios
        .put(
          postAPI,
          {
            content: input.content,
            private: input.private,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "comment",
              commentid: input.commentid,
              postid: postId,
              interact: "reply",
            },
          }
        )
        .then((res) => {
          const replyId = res.data.response._id;
          addCommentReply(postId, input.commentid, replyId, () => {});
          const data = { postId, commentId: input.commentid, replyId };
          sendRealtimeCommentReply(postId, data.commentId, replyId);
          cb(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (type === "rate reply") {
      return axios
        .put(
          postAPI,
          {
            isLiked: input.liked,
            isDisliked: input.disliked,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
              view: "comment",
              commentid: input.replyId,
              interact: "rate",
            },
          }
        )
        .then((res) => {
          updateCommentReply(postId, input.commentId, input.replyId, cb);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }
  // 5. Get the list of categories
  async function getPostCategories() {
    setCategory({
      type: actions.SET_LOADING,
    });
    return axios
      .get(postAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "category",
        },
      })
      .then((res) => {
        setCategory({
          type: actions.GET_POST_CATEGORIES,
          payload: res.data.response,
        });
      })
      .catch((error) => {
        setCategory({
          type: actions.SET_OFF_LOADING,
        });
        setError(error.message);
      });
  }
  // 7. Delete idea
  const removeIdea = (id) => {
    return axios
      .delete(postAPI, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.accessToken}`,
        },
        params: {
          view: "post",
          postid: id,
        },
      })
      .then((res) => {
        setShowUpdate(!showUpdate);
        // cb(res);
      })
      .catch((error) => setError(error.message));
  };
  // 8. Plug-ins
  async function getFile(attachment, cb) {
    await axios
      .get(`${attachment.online_url || attachment.filePath}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.accessToken}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        return res.data;
      })
      .then(
        (blob) =>
          new File([blob], attachment.fileName, {
            type: attachment.fileType,
          })
      )
      .then((data) => cb(data))
      .catch((error) => setError(error.message));
  }
  function getGzipFile() {}
  async function downloadHandler(attachmentId) {
    return axios
      .get(`${host}/api/v1/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          attachmentid: attachmentId,
        },
      })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.response;

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((err) => console.log(err.message));
  }
  // 9. Category
  function getNewCategory(data) {
    setCategory({
      type: actions.ADD_CATEGORY,
      payload: data,
    });
  }
  function removeCategory(commentId) {
    setCategory({
      type: actions.REMOVE_CATEGORY,
      payload: commentId,
    });
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
    deleteSinglePost,
    // updateSinglePost,
    removeIdea,
    loadNextPosts,
    loadMyNextPosts,
    // loadNextPage,
    filterPost,
    filterMyPost,
    interactPost,
    getGzipFile,
    downloadHandler,
    getOwnPosts,
    getPostComments,
    loadNextComments,
    filterPostComment,
    getCommentReplies,
    loadNextReplies,
    getNewCategory,
    removeCategory,
  };

  if (postState.postLoading && categoryState.categoryLoading)
    return <Loading className="post__loading"></Loading>;

  return (
    <PostContextAPI.Provider value={contextValues}>
      {children}
    </PostContextAPI.Provider>
  );
});
export const usePostContext = () => {
  return useContext(PostContextAPI);
};
