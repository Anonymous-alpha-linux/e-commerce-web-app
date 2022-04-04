import React, { useRef, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoIosSend } from 'react-icons/io';

import { ContainerComponent, Text, Icon, Form, ButtonComponent } from "../components";
import { useAuthorizationContext, useNotifyContext, usePostContext, useWorkspaceContext, } from "../redux";
import { notifyData, socketTargets } from '../fixtures';
import { InteractFooter, TriggerLoading } from ".";

export default function Comment({ postAuthor, postId, commentLogs }) {
  const { workspace } = useWorkspaceContext();
  const { posts, loadNextComments, filterPostComment } = usePostContext();
  const filterRef = useRef(filterPostComment);
  const calcRemainingEventTime = (time) => {
    const date = new Date(new Date().setDate(30)).getTime();
    const now = new Date().getTime();

    const timeleft = date - now;

    // var years = Math.floor(timeleft / (1000 * 60));
    // var months = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    // if (years) return years + " years";
    // if (months) return months + " months";
    if (days) return days + " days";
    if (hours) return hours + " hours";
    if (minutes) return minutes + " minutes";
    if (seconds) return seconds + " seconds";
    return "Closed";
  };
  const filterComment = (e) => {
    filterRef.current(postId, e.target.value);
  };
  return (
    <ContainerComponent.Section
      className="comment__section"
      style={{
        padding: "10px 0",
      }}>
      <ContainerComponent.Pane className="comment__header">
        <ContainerComponent.Flex
          style={{
            justifyContent: "space-between",
          }}
        >
          <ContainerComponent.Item>
            <Text.Date>
              Block after {calcRemainingEventTime(workspace.eventTime)}
            </Text.Date>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Form.Select
              onChange={filterComment}
            >
              <Form.Option value={0}>Most Popular</Form.Option>
              <Form.Option value={1}>Most Favorite</Form.Option>
            </Form.Select>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Pane>

      <ContainerComponent.Pane className="comment__input">
        <Comment.TabInput postAuthor={postAuthor} postId={postId}></Comment.TabInput>
      </ContainerComponent.Pane>

      <TriggerLoading
        loader={() => loadNextComments(postId)}
        loadMore={posts.find((post) => post._id === postId).loadMore}
      >
        <ContainerComponent.Pane
          className="comment__log">
          {commentLogs.map((comment) => {
            return <Comment.Tab
              postId={postId}
              key={comment._id}
              comment={comment}
            ></Comment.Tab>
          })}
        </ContainerComponent.Pane>
      </TriggerLoading>
    </ContainerComponent.Section>
  );
}
Comment.Tab = function CommentTab({ ...props }) {
  const { user } = useAuthorizationContext();
  const { interactPost, getCommentReplies, loadNextReplies } = usePostContext();
  const {
    _id,
    body,
    createdAt,
    hideAuthor,
    likedAccounts,
    dislikedAccounts,
    like,
    dislike,
    reply,
    replies,
    account: { _id: targetId, username, profileImage },
    loadMore,
  } = props.comment;
  const parseTime = (time) => {
    const now = new Date(Date.now());
    const end = new Date(time);
    const diff = new Date(now.getTime() - end.getTime());

    if (diff.getUTCDate() - 1 === 0) {
      if (diff.getUTCHours() > 1) return diff.getUTCHours() + " hours ago";
      if (diff.getUTCMinutes() > 1) return diff.getUTCMinutes() + " minutes ago";
      return diff.getUTCSeconds() + " seconds ago";
    }
    if (diff.getUTCDate() < 30) return diff.getUTCDate() + " days ago";
    return `${new Date(time).toLocaleString("en-us", { dateStyle: "full" })}`;
  };
  const isFirstRender = useRef(true);
  const addRepliesRef = useRef(getCommentReplies);
  const loadMoreRepliesRef = useRef(loadNextReplies);
  const inputRef = useRef();
  const [openReplyInput, setOpenReply] = useState(false);
  const [openReplyLog, setOpenReplyLog] = useState(false);

  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    addRepliesRef.current = getCommentReplies;
  }, [getCommentReplies]);
  React.useEffect(() => {
    loadMoreRepliesRef.current = loadNextReplies;
  }, [loadNextReplies])
  React.useEffect(() => {
    if (openReplyInput) {
      inputRef.current.focus();
    }
  }, [openReplyInput]);
  return (
    <ContainerComponent.Pane className="comment__tab" id={`comment__tab-${_id}`} style={{ borderRadius: '10px', background: "#DCE7D7", margin: '12px 0', padding: '10px' }} onMouseLeave={() => setOpenReply(false)}>
      <ContainerComponent.Flex style={{ flexWrap: 'nowrap' }}>
        <ContainerComponent.Item>
          <Text.MiddleLine className="comment__header">
            <Icon.CircleIcon
              style={{ width: "30px", height: "30px", padding: 0, }}>
              <Icon.Image src={profileImage} alt={"avatar"}></Icon.Image>
            </Icon.CircleIcon>
          </Text.MiddleLine>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
          <Text.MiddleLine className="comment__body" style={{ padding: "0 10px" }}>
            <Text.MiddleLine style={{ maxWidth: "120px", overflowX: "clip" }}>
              <Text.Bold style={{ margin: 0 }}>
                <Text>{!hideAuthor ? username : "Anonymous"}</Text>
              </Text.Bold>
            </Text.MiddleLine>

            <Text.MiddleLine>
              <Text.Date style={{ textIndent: '10px' }}>{parseTime(createdAt)}</Text.Date>
            </Text.MiddleLine>

            <Text.Line>
              <Text.Paragraph style={{ margin: "8px 0" }}>
                {body}
              </Text.Paragraph>
            </Text.Line>
          </Text.MiddleLine>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>

      <InteractFooter className="comment__interacts"
        interactLoader={(input) => interactPost(props.postId, "rate comment", input)}
        entity={props.comment}
        like={like}
        dislike={dislike}
        isLiked={likedAccounts.indexOf(user.accountId) !== -1}
        isDisliked={dislikedAccounts.indexOf(user.accountId) !== -1}
        likedAccounts={likedAccounts}
        dislikedAccounts={dislikedAccounts}
      >
        <Text.MiddleLine className="comment__replyBtn"
          onClick={() => {
            setOpenReply(!openReplyInput);
            if (openReplyInput) {
              document.getElementById(`comment__tab-${_id}`).addEventListener('mouseenter', () => {
              });
            }
            else {
              document.getElementById(`comment__tab-${_id}`).removeEventListener('mouseenter', () => {
              });
            }
          }}>
          Reply ({reply})
        </Text.MiddleLine>
      </InteractFooter>
      <Text.Line className="comment__reply">
        {openReplyInput && <Comment.TabReplyInput forwardedRef={inputRef} preReply={username} closeReply={() => setOpenReply(false)} postAuthor={targetId} postId={props.postId} commentId={_id} hideAuthor={hideAuthor}
        // forwardedRef={inputRef} preReply={username} closeReply={() => setOpenReply(false)} postId={props.postId} commentId={rootComment}
        ></Comment.TabReplyInput>}
      </Text.Line>

      <ContainerComponent.Pane className="comment__reply">
        {!openReplyLog && <Text.Line onClick={async () => {
          await addRepliesRef.current(props.postId, _id, () => {
            setOpenReplyLog(true);
          });
        }}>
          {!!reply && <Text.Subtitle style={{ padding: '10px 0', cursor: 'pointer' }}>Read {reply} replies...  </Text.Subtitle>}
        </Text.Line> || <TriggerLoading loader={() => loadMoreRepliesRef.current(props.postId, _id, () => { })} loadMore={loadMore}>
            <ContainerComponent className="comment-reply__log" style={{ borderRadius: "15px" }}>
              {replies.map(reply => {
                return <Comment.ReplyTab
                  rootComment={_id}
                  comment={reply}
                  key={reply._id}
                  postId={props.postId}>
                </Comment.ReplyTab>
              })}
            </ContainerComponent>
          </TriggerLoading>}
      </ContainerComponent.Pane>
    </ContainerComponent.Pane>
  );
};
Comment.TabInput = function TabInput({ forwardedRef, preReply = "", closeReply, postAuthor, postId, commentId }) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();
  const { sendNotification } = useNotifyContext();

  const [input, setInput] = useState({
    pre: preReply,
    content: preReply ? `@${preReply}` : "",
    private: false,
    commentid: commentId,
  });
  const postInputRef = useRef(interactPost);

  React.useEffect(() => {
    postInputRef.current = interactPost;
  }, [interactPost]);
  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const checkedHandler = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.checked,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!commentId) {
      postInputRef.current(postId, "comment", input, commentId => {
        sendNotification(notifyData.COMMENT_POST, `/#${commentId}`, postAuthor);
      });
    } else {
      postInputRef.current(postId, "reply comment", input, replyId => {
        sendNotification(notifyData.REPLY_COMMENT, `/#${replyId}`, postAuthor);
      });
    }
    setInput({
      pre: "",
      content: "",
      private: false,
    });
  };

  return (
    <ContainerComponent.Pane>
      <Text.Line>
        <Text.MiddleLine style={{ marginRight: "10px" }}>
          <Icon.CircleIcon
            style={{
              background: "#163d3c",
              color: "#fff",
              padding: 0,
            }}
          >
            <Icon.Image src={user.profileImage}></Icon.Image>
          </Icon.CircleIcon>
        </Text.MiddleLine>
        <Text.MiddleLine style={{ marginRight: "12px" }}>
          <Text.Bold>{!input.private ? user.account : "Anonymous"}</Text.Bold>
        </Text.MiddleLine>
        <Text.MiddleLine style={{ float: 'right' }}>
          <ButtonComponent.Toggle
            onText="Hide"
            offText="Show"
            id="private"
            name="private"
            value={input.private}
            onChange={checkedHandler}
          ></ButtonComponent.Toggle>
        </Text.MiddleLine>
      </Text.Line>
      <Text.Line>
        <Form method="POST" style={{ width: "100%", padding: "5px 0 0 0", margin: "0" }} onSubmit={submitHandler}>
          <Form.Input ref={forwardedRef} name="content" style={{ width: "100%", marginTop: "4px", border: "1px solid #C4C4C4" }} value={input.content} onChange={inputHandler} placeholder="Leave your comment"
          ></Form.Input>
          <input type="submit" style={{ display: "none" }} onSubmit={submitHandler}></input>
          {/* <Text.MiddleLine>
            <Icon.CircleIcon onClick={submitHandler}>
            </Icon.CircleIcon>
          </Text.MiddleLine> */}
        </Form>
      </Text.Line>
    </ContainerComponent.Pane>
  );
};
Comment.ReplyTab = function ReplyTab({ ...props }) {
  const { user } = useAuthorizationContext();
  const { interactPost, getCommentReplies } = usePostContext();
  const {
    _id,
    body,
    createdAt,
    hideAuthor,
    likedAccounts,
    dislikedAccounts,
    like,
    dislike,
    reply,
    replies,
    account: { username, profileImage },
    loadMore,
  } = props.comment;
  const { rootComment, postId } = props;
  const parseTime = (time) => {
    const now = new Date(Date.now());
    const end = new Date(time);
    const diff = new Date(now.getTime() - end.getTime());

    if (diff.getUTCDate() - 1 === 0) {
      if (diff.getUTCHours() > 1) return diff.getUTCHours() + " hours ago";
      if (diff.getUTCMinutes() > 1) return diff.getUTCMinutes() + " minutes ago";
      return diff.getUTCSeconds() + " seconds ago";
    }
    if (diff.getUTCDate() < 30) return diff.getUTCDate() + " days ago";
    return `${new Date(time).toLocaleString("en-us", { dateStyle: "full" })}`;
  };

  const isFirstRender = useRef(true);
  const addRepliesRef = useRef(getCommentReplies);
  const inputRef = useRef();
  const [openReplyInput, setOpenReply] = useState(false);
  const [openReplyLog, setOpenReplyLog] = useState(false);
  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    addRepliesRef.current = getCommentReplies;
  }, [getCommentReplies]);
  React.useEffect(() => {
    if (openReplyInput) {
      inputRef.current.focus();
    }
  }, [openReplyInput]);
  return (
    <ContainerComponent.Pane className="comment__tab" id={`comment__tab-${_id}`} style={{ borderRadius: '10px', margin: '12px 0', padding: '10px 10px' }} onMouseLeave={() => setOpenReply(false)}>
      <ContainerComponent.Flex style={{ flexWrap: 'nowrap' }}>
        <ContainerComponent.Item>
          <Text.MiddleLine className="comment__header">
            <Icon.CircleIcon style={{ width: "30px", height: "30px", padding: 0, }}>
              <Icon.Image src={profileImage} alt={"avatar"}></Icon.Image>
            </Icon.CircleIcon>
          </Text.MiddleLine>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
          <Text.MiddleLine className="comment__body" style={{ padding: "0 10px" }}>
            <Text.MiddleLine>
              <Text.Bold style={{ margin: 0 }}>
                <Text>{!hideAuthor ? username : "Anonymous"}</Text>
              </Text.Bold>
            </Text.MiddleLine>

            <Text.MiddleLine>
              <Text.Date style={{ textIndent: '10px' }}>{parseTime(createdAt)}</Text.Date>
            </Text.MiddleLine>

            <Text.Line>
              <Text.Paragraph style={{ margin: "8px 0" }}>
                {body}
              </Text.Paragraph>
            </Text.Line>
          </Text.MiddleLine>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>

      <InteractFooter className="comment__interacts"
        entity={{ commentId: rootComment, replyId: _id }}
        like={like}
        dislike={dislike}
        likedAccounts={likedAccounts}
        dislikedAccounts={dislikedAccounts}
        isLiked={likedAccounts.indexOf(user.accountId) !== -1}
        isDisliked={dislikedAccounts.indexOf(user.accountId) !== -1}
        // interactLoader={(interact) => interactPost(props.postId, "rate reply", interact)}
        interactLoader={input => interactPost(props.postId, "rate reply", input)}
      >
        <Text.MiddleLine className="comment__replyBtn"
          onClick={() => {
            setOpenReply(!openReplyInput);
            if (openReplyInput) {
              document.getElementById(`comment__tab-${_id}`).addEventListener('mouseenter', () => {
              });
            }
            else {
              document.getElementById(`comment__tab-${_id}`).removeEventListener('mouseenter', () => {
              });
            }
          }}>
          Reply
        </Text.MiddleLine>
      </InteractFooter>

      <Text.Line>
        {openReplyInput &&
          <Comment.TabReplyInput forwardedRef={inputRef} preReply={username} closeReply={() => setOpenReply(false)} postId={props.postId} commentId={rootComment} hideAuthor={hideAuthor}></Comment.TabReplyInput>
        }
      </Text.Line>

      <ContainerComponent.Pane className="comment__container">
        {!openReplyLog && <Text.Line onClick={async () => {
          addRepliesRef.current(postId, rootComment, () => {
            setOpenReplyLog(false);
          });
        }}>
        </Text.Line> || <TriggerLoading loader={() => getCommentReplies(postId, _id, () => { })}
          loadMore={replies.length < reply}>
            <ContainerComponent className="comment-reply__log">
              {replies.map(comment => {
                return <Comment.Tab
                  comment={comment}
                  key={comment._id}
                  postId={props.postId}>
                </Comment.Tab>
              })}
            </ContainerComponent>
          </TriggerLoading>}
      </ContainerComponent.Pane>

    </ContainerComponent.Pane>
  );
}
Comment.TabReplyInput = function TabReplyInput({ forwardedRef, preReply = "", closeReply, postAuthor, postId, commentId, hideAuthor }) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();
  const { sendNotification } = useNotifyContext();
  const [input, setInput] = useState({
    pre: hideAuthor ? "Anonymous" : preReply,
    content: hideAuthor ? '@Anonymous' : preReply ? `@${preReply}` : "",
    private: false,
    commentid: commentId,
  });
  const postInputRef = useRef(interactPost);

  React.useEffect(() => {
    postInputRef.current = interactPost;
  }, [interactPost]);
  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const checkedHandler = (e) => {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.checked,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!commentId) {
      postInputRef.current(postId, "comment", input, commentId => {
        sendNotification(notifyData.REPLY_COMMENT, `/#${commentId}`, postAuthor);
      });
    } else {
      postInputRef.current(postId, "reply comment", input, replyId => {
        sendNotification(notifyData.COMMENT_POST, `/#${replyId}`, commentId);
      });
    }
    closeReply();
    // setInput({
    //   pre: "",
    //   content: "",
    //   private: false,
    // });
  };

  return (
    <ContainerComponent.Pane className="tab-reply__input" style={{ maxWidth: "320px", padding: "15px 15px" }}>
      <Text.Line>
        <Text.MiddleLine style={{ marginRight: "20px", background: "#DCE7D7", }}>
          <Icon.CircleIcon
            style={{
              background: "#163d3c",
              color: "#fff",
              padding: 0,
            }}
          >
            <Icon.Image src={user.profileImage}></Icon.Image>
          </Icon.CircleIcon>
        </Text.MiddleLine>
        <Text.MiddleLine style={{ marginRight: "12px" }}>
          <Text.Bold>{!input.private ? user.account : "Anonymous"}</Text.Bold>
        </Text.MiddleLine>
        <Text.MiddleLine style={{ float: 'right' }}>
          <ButtonComponent.Toggle
            onText="Hide"
            offText="Show"
            id="private"
            name="private"
            value={input.private}
            onChange={checkedHandler}
          ></ButtonComponent.Toggle>
        </Text.MiddleLine>
      </Text.Line>
      <Text.Line style={{ maxWidth: "320px" }}>
        <Form method="POST" style={{ background: "#DCE7D7", width: "100%", padding: "2px 0 0 0", margin: "0" }} onSubmit={submitHandler}>
          <Form.Input ref={forwardedRef} name="content" style={{ marginTop: "4px", border: "1px solid #C4C4C4" }} value={input.content} onChange={inputHandler} placeholder="Leave your comment"
          ></Form.Input>
          <input type="submit" style={{ display: "none" }}></input>
          {/* <Text.MiddleLine>
            <Icon.CircleIcon>
              <Form.Input component={<FiSend />}></Form.Input>
            </Icon.CircleIcon>
          </Text.MiddleLine> */}
        </Form>
      </Text.Line>
    </ContainerComponent.Pane>
  );
};

