import React, { useRef, useState } from "react";
import {
  ContainerComponent,
  Text,
  Icon,
  Form,
  ButtonComponent,
} from "../components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import {
  useAuthorizationContext,
  usePostContext,
  useWorkspaceContext,
} from "../redux";
import { TriggerLoading } from ".";

export default function Comment({ postId, commentLogs }) {
  const { workspace } = useWorkspaceContext();
  const { posts, loadNextComments, filterPostComment } = usePostContext();

  const filterRef = useRef(filterPostComment);

  const calcRemainingEventTime = (time) => {
    const date = new Date(time);
    const now = new Date(Date.now());
    if (Math.floor(date.getFullYear() - now.getFullYear())) {
      return Math.floor(date.getFullYear() - now.getFullYear()) + " years";
    } else if (Math.floor(date.getMonth() - now.getMonth())) {
      return Math.floor(date.getMonth() - now.getMonth()) + " months";
    } else if (Math.floor(date.getDate() - now.getDate())) {
      return Math.floor(date.getDate() - now.getDate()) + " days";
    } else if (Math.floor(date.getHours() - now.getHours())) {
      return Math.floor(date.getHours() - now.getHours()) + " hours";
    } else if (date.getMinutes() - now.getMinutes()) {
      return date.getMinutes() - now.getMinutes() + " minutes";
    } else if (date.getMinutes() - now.getMinutes()) {
      return date.getMinutes() - now.getMinutes() + " seconds";
    }
    return "Closed";
  };
  const filterComment = (e) => {
    filterRef.current(postId, e.target.value);
  };
  return (
    <ContainerComponent.Section
      className="comment__section"
      style={{
        padding: "10px",
      }}
    >
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
              // value={filterInput}
              onChange={filterComment}
            >
              <Form.Option value={0}>Most Popular</Form.Option>
              <Form.Option value={1}>Most Favorite</Form.Option>
            </Form.Select>
            {/* <Filter></Filter> */}
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Pane>

      <ContainerComponent.Pane className="comment__body">
        <Comment.TabInput postId={postId}></Comment.TabInput>
      </ContainerComponent.Pane>

      <TriggerLoading
        loader={() => loadNextComments(postId)}
        loadMore={posts.find((post) => post._id === postId).loadMore}
      >
        <ContainerComponent.Pane
          className="comment__log"
          style={{
            paddingTop: "12px",
          }}
        >
          {commentLogs.map((comment) => (
            <Comment.Tab
              postId={postId}
              key={comment._id}
              comment={comment}
            ></Comment.Tab>
          ))}
        </ContainerComponent.Pane>
      </TriggerLoading>
      {/* 
      <ContainerComponent.Pane className="comment__footer">
        <Text.Subtitle
          style={{ textAlign: "center", width: "100%", margin: "10px 0" }}>
          More...
        </Text.Subtitle>
      </ContainerComponent.Pane> */}
    </ContainerComponent.Section>
  );
}

Comment.Tab = function CommentTab({ ...props }) {
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
  const { postId } = props;

  const parseTime = (time) => {
    const minuteAgo =
      new Date(Date.now()).getMinutes() - new Date(time).getMinutes();
    const hourAgo = new Date(Date.now()).getHours() - new Date(time).getHours();
    const DateAgo = new Date(Date.now()).getDate() - new Date(time).getDate();
    const ago = new Date(time).getDate();

    if (ago < 1) {
      if (minuteAgo > 60) return minuteAgo + " minutes ago";
      if (hourAgo > 1) return hourAgo + " hours ago";
    }
    if (ago < 2) return DateAgo + " days ago";
    return `${new Date(time).toLocaleString("en-us", { dateStyle: "full" })}`;
  };

  const isFirstRender = useRef(true);
  const interactRef = useRef(interactPost);
  const addRepliesRef = useRef(getCommentReplies);
  const inputRef = useRef();

  const [interact, setInteract] = useState({
    liked: !!likedAccounts.find((acc) => acc._id === user.accountId),
    disliked: !!dislikedAccounts.find((acc) => acc._id === user.accountId),
    commentId: _id,
  });
  const [openReply, setOpenReply] = useState(false);
  const [openReplyLog, setOpenReplyLog] = useState(false);
  const checkedHandler = async (e) => {
    if (e.target.name === "like") {
      setInteract({
        ...interact,
        liked: !interact.liked,
        disliked: interact.disliked && false,
      });
    }
    if (e.target.name === "dislike") {
      setInteract({
        ...interact,
        disliked: !interact.disliked,
        liked: interact.liked && false,
      });
    }
  };

  React.useEffect(() => {
    if (!isFirstRender.current) {
      interactRef.current(props.postId, "rate comment", interact, () => {});
    }
  }, [interact]);
  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    interactRef.current = interactPost;
  }, [interactRef]);
  React.useEffect(() => {
    addRepliesRef.current = getCommentReplies;
  }, [getCommentReplies]);
  React.useEffect(() => {
    if (openReply) {
      inputRef.current.focus();
    }
  }, [openReply]);
  return (
    <ContainerComponent.Pane
      className="comment__tab"
      id={`comment__tab-${_id}`}
      onMouseLeave={() => setOpenReply(false)}
    >
      <Text.MiddleLine className="comment__header">
        <Icon.CircleIcon
          style={{
            width: "30px",
            height: "30px",
            padding: 0,
          }}
        >
          <Icon.Image src={profileImage} alt={"avatar"}></Icon.Image>
        </Icon.CircleIcon>
      </Text.MiddleLine>
      <Text.MiddleLine className="comment__body" style={{ padding: "0 10px" }}>
        <Text.MiddleLine>
          <Text.Bold style={{ margin: 0 }}>
            <Text>{!hideAuthor ? username : "Anonymous"}</Text>
          </Text.Bold>
        </Text.MiddleLine>
        <Text.Line>
          <Text.MiddleLine>
            <Text.Date>Commented in {parseTime(createdAt)}</Text.Date>
          </Text.MiddleLine>
        </Text.Line>
        <Text.Line>
          <Text.Paragraph
            style={{
              margin: "8px 0",
            }}
          >
            {body}
          </Text.Paragraph>
        </Text.Line>
      </Text.MiddleLine>
      <Text.Line className="comment__interacts">
        <Text.MiddleLine className="comment__like">
          <input
            type="checkbox"
            name="like"
            id={`like - ${_id} `}
            value={interact.liked}
            onChange={checkedHandler}
            style={{ display: "none" }}
          ></input>
          <Icon.CircleIcon
            className="comment__likeIcon"
            onClick={() => {
              document.getElementById(`like - ${_id} `).click();
            }}
          >
            <FaThumbsUp
              stroke="#000"
              strokeWidth={20}
              style={{
                fill: `${interact.liked ? "blue" : "transparent"} `,
                position: "absolute",
                top: "50%",
                transform: "translate(-50%,-50%)",
                left: "50%",
              }}
            />
          </Icon.CircleIcon>
          {like}
        </Text.MiddleLine>

        <Text.MiddleLine
          className="comment__dislike"
          style={{ margin: "0 10px" }}
        >
          <input
            type="checkbox"
            name="dislike"
            id={`dislike ${_id} `}
            value={interact.disliked}
            onChange={checkedHandler}
            style={{ display: "none" }}
          ></input>
          <Icon.CircleIcon
            className="comment__dislikeIcon"
            onClick={() => {
              document.getElementById(`dislike ${_id} `).click();
            }}
          >
            <FaThumbsDown
              stroke="#000"
              strokeWidth={20}
              style={{
                fill: `${interact.disliked ? "blue" : "transparent"} `,
                position: "absolute",
                top: "50%",
                transform: "translate(-50%,-50%)",
                left: "50%",
              }}
            />
          </Icon.CircleIcon>
          {dislike}
        </Text.MiddleLine>

        {/* <Text.MiddleLine className="comment__replyBtn"
          onClick={() => {
            setOpenReply(!openReply);
            if (openReply) {
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
        {openReply && <Text.Line className="comment__reply">
          <Comment.TabReply
            forwardedRef={inputRef}
            preReply={username}
            closeReply={() => setOpenReply(false)}
            postId={props.postId}
            commentId={_id}
          ></Comment.TabReply>
        </Text.Line>} */}
      </Text.Line>

      {/* <ContainerComponent.Pane className="comment__reply">
        {!openReplyLog && <Text.Line onClick={async () => {
          await addRepliesRef.current(postId, _id, () => {
            setOpenReplyLog(false);
          });
        }}
          style={{ padding: '10px 0', cursor: 'pointer' }}>
          {reply && <Text.Subtitle>Read {reply} replies...  </Text.Subtitle> || <></>}
        </Text.Line>
          ||
          <TriggerLoading loader={() => getCommentReplies(postId, _id, () => { })}
            loadMore={replies.length < reply}>
            <ContainerComponent className="comment-reply__log">
              {replies.map(comment => {
                console.log(comment)
                return <Comment.Tab
                  comment={comment}
                  key={comment._id}
                  postId={props.postId}>
                </Comment.Tab>
              })}
            </ContainerComponent>
          </TriggerLoading>}
      </ContainerComponent.Pane> */}
    </ContainerComponent.Pane>
  );
};

Comment.TabInput = function TabInput({ postId, preReply = "", commentId }) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();

  const [input, setInput] = useState({
    pre: preReply,
    content: preReply ? `@${preReply}` : "",
    private: false,
    commentid: commentId,
  });
  const loader = useRef(interactPost);

  React.useEffect(() => {
    loader.current = interactPost;
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
      loader.current(postId, "comment", input, () => {});
    } else {
      loader.current(postId, "reply comment", input, () => {});
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
        <Text.MiddleLine style={{ marginRight: "20px" }}>
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
        <ButtonComponent.Toggle
          onText="Hide"
          offText="Show"
          id="private"
          name="private"
          value={input.private}
          onChange={checkedHandler}
        ></ButtonComponent.Toggle>
      </Text.Line>
      <Text.Line>
        <Form
          method="POST"
          style={{ width: "100%", padding: "20px 0", margin: "0" }}
          onSubmit={submitHandler}
        >
          <Form.Input
            placeholder="Leave your comment"
            name="content"
            value={input.content}
            onChange={inputHandler}
            style={{ width: "calc(100% - 30px)" }}
          ></Form.Input>
          <input type="submit" style={{ display: "none" }}></input>

          <Text.MiddleLine>
            <Text.CenterLine>
              <Icon.CircleIcon>
                <Form.Input component={<FiSend />}></Form.Input>
              </Icon.CircleIcon>
            </Text.CenterLine>
          </Text.MiddleLine>
        </Form>
      </Text.Line>
    </ContainerComponent.Pane>
  );
};

Comment.TabReply = function TabReply({
  forwardedRef,
  postId,
  closeReply,
  preReply = "",
  commentId,
}) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();

  const [input, setInput] = useState({
    pre: preReply,
    content: `${preReply && `@${preReply}`} `,
    private: false,
    commentid: commentId,
  });
  const loader = useRef(interactPost);

  console.log(commentId);
  React.useEffect(() => {
    loader.current = interactPost;
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
    loader.current(postId, "reply comment", input, () => {});
    closeReply();
    setInput({
      pre: "",
      content: "",
      private: false,
    });
  };
  const onBlurHandler = (e) => {
    closeReply();
  };

  return (
    <ContainerComponent.Pane
      className="comment-reply__container"
      id="comment__reply"
      onMouseLeave={onBlurHandler}
    >
      <Text.Line>
        <Text.MiddleLine style={{ marginRight: "20px" }}>
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
        <ButtonComponent.Toggle
          onText="Hide"
          offText="Show"
          id="private"
          name="private"
          value={input.private}
          onChange={checkedHandler}
        ></ButtonComponent.Toggle>
      </Text.Line>
      <Text.Line>
        <Form
          method="POST"
          style={{ padding: "0 20px", width: "100%" }}
          onSubmit={submitHandler}
        >
          <Form.Input
            ref={forwardedRef}
            placeholder="Leave your comment"
            name="content"
            value={input.content}
            onChange={inputHandler}
            style={{ width: "calc(100% - 60px)" }}
          ></Form.Input>
          <input type="submit" style={{ display: "none" }}></input>

          <Text.MiddleLine>
            <Text.CenterLine>
              <Icon.CircleIcon>
                <Form.Input component={<FiSend />}></Form.Input>
              </Icon.CircleIcon>
            </Text.CenterLine>
          </Text.MiddleLine>
        </Form>
      </Text.Line>
    </ContainerComponent.Pane>
  );
};
