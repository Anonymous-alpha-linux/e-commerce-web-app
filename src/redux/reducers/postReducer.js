import actions from "./actions";
import ActionHandler from "./handleActions";

export const initialPostPage = {
  posts: [],
  myPosts: [],
  postLoading: true,
  page: 0,
  myPage: 0,
  count: 3,
  more: true,
  filter: 0
}
const postReducer = (state, action) => {
  const actionHandler = new ActionHandler(state, action);
  switch (action.type) {
    /*
           1. action.payload: [Array],
           2. action.page: [Number],
           3. action.filter: [Number]
           4. action.postid: [String]
           5. action.commentid: [String]
       */
    case actions.GET_POST_LIST:
      return actionHandler.getListItem('posts', action.payload, {
        ...state,
        postLoading: false,
        filter: 0,
        page: 0
      });
    case actions.LOAD_MORE_POST:
      return actionHandler.loadMoreItems('posts', action.payload);
    case actions.FILTER_POST_LIST:
      return actionHandler.filterListItem('posts', action.payload, { postLoading: false });
    case actions.PUSH_IDEA:
      console.log(action.payload);
      return actionHandler.unshiftItem('posts', action.payload, actionHandler.unshiftItem('myPosts', action.payload, state));
    case actions.UPDATE_SINGLE_POST:
      return actionHandler.updateItem('myPosts', post => {
        if (post._id === action.postId) return action.payload;
        return post;
      }, actionHandler.updateItem('posts', post => {
        if (post._id === action.postId) return action.payload;
        return post;
      }, state));
    case actions.REMOVE_SINGLE_POST:
      const singlePost = actionHandler.removeItem('posts', post => {
        if (post._id === action.postId) return null;
        return post;
      }, actionHandler.removeItem('myPosts', post => {
        if (post._id === action.postId) return null;
        return post;
      }, state));
      return singlePost;
    case actions.LIKE_POST:
      return actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("like", action.isLiked ? post.like + 1 : post.like - 1, actionHandler.updateItem("likedAccounts", accounts => {
          if (action.isLiked) {
            post.likedAccounts.unshift(action.userId);
            post.dislikedAccounts.filter(acc => acc === action.userId);
          }
          else post.likedAccounts.filter(acc => acc !== action.userId);
        }, post));
        return post;
      }, actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("like", action.isLiked ? post.like + 1 : post.like - 1, actionHandler.updateItem("likedAccounts", accounts => {
          if (action.isLiked) {
            post.likedAccounts.unshift(action.userId);
            post.dislikedAccounts.filter(acc => acc !== action.userId);
          }
          else post.likedAccounts.filter(acc => acc !== action.userId);
        }, post));
        return post;
      }, state));
    case actions.DISLIKE_POST:
      return actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("dislike", action.isDisliked ? post.dislike + 1 : post.dislike - 1, actionHandler.updateItem("dislikedAccounts", accounts => {
          if (action.isDisliked) {
            post.dislikedAccounts.unshift(action.userId);
            post.likedAccounts.filter(acc => acc !== action.userId);
          }
          else post.dislikedAccounts.filter(acc => acc !== action.userId);
        }, post));
        return post;
      }, actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("dislike", action.isDisliked ? post.dislike + 1 : post.dislike - 1, actionHandler.updateItem("dislikedAccounts", accounts => {
          if (action.isDisliked) {
            post.dislikedAccounts.unshift(action.userId);
            post.likedAccounts.filter(acc => acc !== action.userId);
          }
          else post.dislikedAccounts.filter(acc => acc !== action.userId);
        }, post));
        return post;
      }, state));
    case actions.LIKE_COMMENT:
      return actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem('comments', comment => {
          if (comment._id === action.commentId) return actionHandler.updateItem("like", action.isLiked ? post.like + 1 : post.like - 1, actionHandler.updateItem("likedAccounts", accounts => {
            if (action.isLiked) post.likedAccounts.unshift(action.userId);
            else post.likedAccounts.filter(acc => acc !== action.userId);
          }, comment));
        }, post);
        return post;
      }, actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem('comments', comment => {
          if (comment._id === action.commentId) return actionHandler.updateItem("like", action.isLiked ? post.like + 1 : post.like - 1, actionHandler.updateItem("likedAccounts", accounts => {
            if (action.isLiked) post.likedAccounts.unshift(action.userId)
            else post.likedAccounts.filter(acc => acc !== action.userId);
          }, comment));
          return comment;
        }, post);
        return post;
      }, state));
    case actions.DISLIKE_COMMENT:
      return actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem('comments', comment => {
          if (comment._id === action.commentId) return actionHandler.updateItem("dislike", action.isDisliked ? post.dislike + 1 : post.dislike - 1, actionHandler.updateItem("dislikedAccounts", accounts => {
            if (action.isDisliked) post.dislikedAccounts.unshift(action.userId);
            else post.dislikedAccounts.filter(acc => acc !== action.userId);
          }, comment));
        }, post);
        return post;
      }, actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem('comments', comment => {
          if (comment._id === action.commentId) return actionHandler.updateItem("dislike", action.isDisliked ? post.dislike + 1 : post.dislike - 1, actionHandler.updateItem("dislikedAccounts", accounts => {
            if (action.isDisliked) post.dislikedAccounts.unshift(action.userId)
            else post.dislikedAccounts.filter(acc => acc !== action.userId);
          }, comment));
          return comment;
        }, post);
        return post;
      }, state));

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
    case actions.PUSH_MY_IDEA:
      return actionHandler.unshiftItem("myPosts", action.payload);
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
      return actionHandler.updateItem('posts', post => {
        if (post._id === action.postId) return actionHandler.getListItem("comments", action.payload, {
          ...post,
          loadMore: action.payload.length >= 10,
          count: 10,
          page: 0
        });
        return post;
      }, actionHandler.updateItem('myPosts', post => {
        if (post._id === action.postId) return actionHandler.getListItem("comments", action.payload, post);
        return post;
      }, state));
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
      return actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.unshiftItem("comments", action.payload, { ...post, comment: post.comment + 1 });
        return post
      }, actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.unshiftItem("comments", action.payload, { ...post, comment: post.comment + 1 });
        return post;
      }, state));

    case actions.GET_COMMENT_REPLIES:
      return actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) return actionHandler.getListItem("replies", action.payload, { ...comment, page: 0, count: 10, loadMore: action.payload.length >= 10 });
          return comment;
        }, post)
        return post;
      }, actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) return actionHandler.getListItem("replies", action.payload, { ...comment, page: 0, count: 10, loadMore: action.payload.length >= 10 });
          return comment;
        }, post)
        return post;
      }, state));
    case actions.UPDATE_COMMENT_REPLY:
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
    case actions.LOAD_MORE_COMMENT_REPLIES:
      return actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) return actionHandler.pushItem("replies", action.payload, { ...comment, page: comment.page + 1, loadMore: action.payload.length >= 10 });
          return comment;
        }, post)
        return post;
      }, actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) return actionHandler.pushItem("replies", action.payload, { ...comment, page: comment.page + 1, loadMore: action.payload.length >= 10 });
          return comment;
        }, post)
        return post;
      }, state));
    case actions.ADD_COMMENT_REPLY:
      /*
          action.postId: [String]
          action.commentId: [String]
          action.payload: [Object]
      */
      return actionHandler.updateItem("posts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) { console.log(comment.replies, action.payload); return actionHandler.unshiftItem("replies", action.payload, { ...comment, reply: comment.reply + 1 }); }
          return comment;
        }, post)
        return post;
      }, actionHandler.updateItem("myPosts", post => {
        if (post._id === action.postId) return actionHandler.updateItem("comments", comment => {
          if (comment._id === action.commentId) return actionHandler.unshiftItem("replies", action.payload, { ...comment, reply: comment.reply + 1 });
          return comment;
        }, post)
        return post;
      }, state));
    case actions.UPDATE_COMMENT_REPLY:
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
};
export default postReducer;
