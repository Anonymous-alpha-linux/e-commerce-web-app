import React, { useRef, useState } from "react";
import { ContainerComponent, Text, Icon, Form, ButtonComponent } from "../components";
import { FaLock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuthorizationContext, usePostContext, useWorkspaceContext } from "../redux";


export default function Comment({ postId, commentLogs }) {
  const { user } = useAuthorizationContext();
  const { workspace } = useWorkspaceContext();
  const { interactPost } = usePostContext();

  const [input, setInput] = useState({
    content: '',
    private: false
  });
  const [loading, setLoading] = useState(false);
  const loader = useRef(interactPost);

  React.useEffect(() => {
    loader.current = interactPost;
  }, [interactPost]);

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const checkedHandler = (e) => {
    setInput(input => ({
      ...input,
      [e.target.name]: e.target.checked,
    }))
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await loader.current(postId, 'comment', input, () => {
    });
    setInput({
      content: '',
      private: false
    });
  }
  const calcRemainingEventTime = (time) => {
    const date = new Date(time);
    const now = new Date(Date.now());
    if (Math.floor(date.getFullYear() - now.getFullYear())) {
      return Math.floor(date.getFullYear() - now.getFullYear()) + ' years';
    }
    else if (Math.floor(date.getMonth() - now.getMonth())) {
      return Math.floor(date.getMonth() - now.getMonth()) + ' months';
    }
    else if (Math.floor(date.getDate() - now.getDate())) {
      return Math.floor(date.getDate() - now.getDate()) + ' days';
    }
    else if (Math.floor(date.getHours() - now.getHours())) {
      return Math.floor(date.getHours() - now.getHours()) + ' hours';
    }
    else if (date.getMinutes() - now.getMinutes())
      return date.getMinutes() - now.getMinutes() + ' minutes';
    else if (date.getMinutes() - now.getMinutes())
      return date.getMinutes() - now.getMinutes() + ' seconds';
    return 'Closed';
  }
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
            <Text.Date>Block after {calcRemainingEventTime(workspace.eventTime)}</Text.Date>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Form.Select>
              <Form.Option>Most Popular</Form.Option>
              <Form.Option>Most Favorite</Form.Option>
            </Form.Select>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane className="comment__body">
        <ContainerComponent.Flex
          style={{ alignItems: "center", flexWrap: "nowrap" }}
        >
          <ContainerComponent.Item style={{ width: '50px' }}>
            <Icon.CircleIcon
              style={{
                background: "#163d3c",
                color: "#fff",
                padding: 0,
              }}
            >
              <Icon.Image src={user.profileImage}></Icon.Image>
            </Icon.CircleIcon>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              flexGrow: 1,
            }}
          >
            <Text.Line>
              <Text.MiddleLine style={{ marginRight: '12px' }}>
                <Text.Bold>{!input.private ? user.account : 'Anonymous'}</Text.Bold>
              </Text.MiddleLine>
              <ButtonComponent.Toggle
                onText="Hide"
                offText="Show"
                id="private"
                name="private"
                value={input.private}
                onChange={checkedHandler}>
              </ButtonComponent.Toggle>
            </Text.Line>
            <Text.Line>
              <Form
                method='POST'
                style={{ paddingLeft: 0, paddingRight: 0, width: '120px' }}
                onSubmit={submitHandler}
              >
                <Form.Input
                  placeholder="Leave your comment"
                  name='content'
                  value={input.content}
                  onChange={inputHandler}
                  style={{ width: 'calc(100% - 60px)' }}
                ></Form.Input>
                <input type='submit' style={{ display: 'none' }}></input>
                <Text.RightLine>
                  <Text.MiddleLine>
                    <Text.CenterLine>
                      <Icon.CircleIcon>
                        <Form.Input component={<FiSend />}></Form.Input>
                      </Icon.CircleIcon>
                    </Text.CenterLine>
                  </Text.MiddleLine>
                </Text.RightLine>
              </Form>
            </Text.Line>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
        <ContainerComponent.Pane className="comment__log__footer">
        </ContainerComponent.Pane>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane
        className="comment__log"
        style={{
          paddingTop: "12px",
        }}
      >
        {commentLogs.map(comment => <Comment.Tab postId={postId}
          key={comment._id}
          comment={comment}></Comment.Tab>)}
      </ContainerComponent.Pane>
      {/* <ContainerComponent.Pane className="comment__footer">
        <Text.Subtitle
          style={{ textAlign: "center", width: "100%", margin: "10px 0" }}
        >
          More...
        </Text.Subtitle>
      </ContainerComponent.Pane> */}
    </ContainerComponent.Section>
  );
}

Comment.Tab = function CommentTab({ children, ...props }) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();
  const { _id, body, createdAt, hideAuthor, likedAccounts, dislikedAccounts, account: { username, profileImage } } = props.comment;

  const parseTime = (time) => {
    const timeStr = `${(new Date(time)).getHours()}:${(new Date(time)).getMinutes()}`;
    return timeStr;
  }
  const isFirstRender = useRef(true);
  const interactRef = useRef(interactPost);

  const [interact, setInteract] = useState({
    liked: likedAccounts.indexOf(user.accountId) > -1,
    disliked: dislikedAccounts.indexOf(user.accountId) > -1,
    commentId: _id
  })

  const checkedHandler = async (e) => {
    if (e.target.name === 'like') {
      setInteract({
        ...interact,
        liked: !interact.liked,
        disliked: interact.disliked && false,
      });
    }
    if (e.target.name === 'dislike') {
      setInteract({
        ...interact,
        disliked: !interact.disliked,
        liked: interact.liked && false
      });
    }
  }

  React.useEffect(() => {
    if (!isFirstRender.current) {
      interactRef.current(props.postId, 'rate comment', interact, () => { });
    }
  }, [interact]);

  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);

  React.useEffect(() => {
    interactRef.current = interactPost;
  }, [interactRef]);



  return (
    <>
      <Text.MiddleLine>
        <Icon.CircleIcon style={{
          width: '30px',
          height: '30px',
          padding: 0
        }}>
          <Icon.Image src={profileImage} alt={'avatar'}></Icon.Image>
        </Icon.CircleIcon>
      </Text.MiddleLine>
      <Text.MiddleLine style={{ padding: '0 10px' }}>
        <Text.MiddleLine>
          <Text.Bold style={{ margin: 0 }}>
            <Text>
              {!hideAuthor ? username : 'Anonymous'}
            </Text>
          </Text.Bold>
        </Text.MiddleLine>
        <Text.MiddleLine>
          <Text.Date
            style={{
              marginLeft: "8px",
            }}
          >
            {parseTime(createdAt)}
          </Text.Date>
        </Text.MiddleLine>
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

      <Text.Line>
        <Text.MiddleLine>
          <input type='checkbox'
            name="like"
            id={`like ${_id}`}
            value={interact.liked}
            onChange={checkedHandler}
            style={{ display: 'none' }}></input>
          <Icon.CircleIcon onClick={() => { document.getElementById(`like ${_id}`).click() }}>
            <FaThumbsUp stroke='#000' strokeWidth={20} style={{
              fill: `${interact.liked ? 'blue' : 'transparent'}`,
              position: "absolute",
              top: '50%',
              transform: 'translate(-50%,-50%)',
              left: '50%'
            }} />
          </Icon.CircleIcon>
          {likedAccounts.length}
        </Text.MiddleLine>
        <Text.MiddleLine style={{ margin: "0 10px" }}>
          <input type='checkbox'
            name="dislike"
            id={`dislike ${_id}`}
            value={interact.disliked}
            onChange={checkedHandler}
            style={{ display: 'none' }}></input>
          <Icon.CircleIcon onClick={() => { document.getElementById(`dislike ${_id}`).click() }}>
            <FaThumbsDown stroke='#000' strokeWidth={20} style={{
              fill: `${interact.disliked ? 'blue' : 'transparent'}`,
              position: "absolute",
              top: '50%',
              transform: 'translate(-50%,-50%)',
              left: '50%'
            }} />
          </Icon.CircleIcon>
          {dislikedAccounts.length}
        </Text.MiddleLine>
        <Text.MiddleLine>
          Reply
        </Text.MiddleLine>
      </Text.Line>
    </>
  );
};
