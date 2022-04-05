import React, { useState, useRef } from "react";
import {
  ContainerComponent,
  Icon,
  Text,
  Preview,
  Dropdown,
} from "../components";
import { FaThumbsUp, FaThumbsDown, FaRegEdit, FaEraser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { Comment, DropDownButton, GridPreview } from ".";
import {
  useAuthorizationContext,
  useNotifyContext,
  usePostContext,
} from "../redux";
import { Link, useNavigate } from "react-router-dom";
import { roles } from "../fixtures";
import axios from "axios";
import { mainAPI } from "../config";
// import { notifyData, socketTargets } from "../fixtures";

export default function Post({ postHeader, postBody, postFooter }) {
  const { user } = useAuthorizationContext();
  const { interactPost, getPostComments, deleteSinglePost } = usePostContext();
  const {
    like,
    dislike,
    isLiked,
    isDisliked,
    likedAccounts,
    dislikedAccounts,
  } = postFooter;

  const { sendNotification } = useNotifyContext();
  const isFirstRender = useRef(true);
  const interactRef = useRef(interactPost);
  const getComment = useRef(getPostComments);

  const [openComment, setOpenComment] = useState(false);

  const checkedHandler = async (e) => {
    if (e.target.name === "like") {
      likeHandler();
    } else if (e.target.name === "dislike") {
      dislikeHandler();
    }
    // interactRef.current(postHeader.id, 'rate', { like: !isLiked ? like + 1 : like - 1, dislike: !isDisliked ? dislike + 1 : dislike - 1, likedAccounts: [...likedAccounts, user.accountId], dislikedAccounts: [...dislikedAccounts, user.accountId], isDisliked: !isDisliked, isLiked: !isLiked });
  };
  const likeHandler = () => {
    interactRef.current(postHeader.id, "rate", {
      like: !isLiked ? like + 1 : like - 1,
      dislike: isDisliked ? dislike - 1 : dislike,
      likedAccounts: !isLiked
        ? [...likedAccounts, user.accountId]
        : likedAccounts.filter((acc) => acc !== user.accountId),
      dislikedAccounts: isDisliked
        ? dislikedAccounts.filter((acc) => acc !== user.accountId)
        : dislikedAccounts,
      isLiked: !isLiked,
      isDisliked: false,
    });
  };
  const dislikeHandler = () => {
    interactRef.current(postHeader.id, "rate", {
      like: isLiked ? like - 1 : like,
      dislike: !isDisliked ? dislike + 1 : dislike - 1,
      likedAccounts: isLiked
        ? likedAccounts.filter((acc) => acc !== user.accountId)
        : likedAccounts,
      dislikedAccounts: !isDisliked
        ? [...dislikedAccounts, user.accountId]
        : dislikedAccounts.filter((acc) => acc !== user.accountId),
      isLiked: false,
      isDisliked: !isDisliked,
    });
  };
  const downloadHandler = async (e) => {
    return axios
      .get(`${mainAPI.LOCALHOST_HOST}/api/v1/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          postid: postHeader.id,
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
  };
  const parseTime = (time) => {
    const now = new Date(Date.now());
    const end = new Date(time);
    const diff = new Date(now.getTime() - end.getTime());

    if (diff.getUTCDate() - 1 === 0) {
      if (diff.getUTCHours() > 1) return diff.getUTCHours() + " hours ago";
      if (diff.getUTCMinutes() > 1)
        return diff.getUTCMinutes() + " minutes ago";
      return diff.getUTCSeconds() + " seconds ago";
    }
    if (diff.getUTCDate() < 30) return diff.getUTCDate() + " days ago";
    return `${new Date(time).toLocaleString("en-us", { dateStyle: "full" })}`;
  };

  React.useEffect(() => {
    getComment.current = getPostComments;
  }, [getPostComments]);
  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    interactRef.current = interactPost;
  }, [interactRef]);

  return (
    <ContainerComponent.Inner className="workspace__form">
      <ContainerComponent.Inner className="workspace__innerForm">
        <ContainerComponent.Section
          className="post__section"
          style={{
            padding: "10px 20px",
            background: "white"
          }}
        >
          <ContainerComponent.Pane className="post__header">
            <ContainerComponent.InlineGroup>
              <Icon.Avatar style={{
                verticalAlign: 'middle',
                background: '#163d3c',
                color: '#fff',
                width: "45px",
                height: "45px"
              }}>
                <Preview.Images image={postHeader.image} alt={postHeader.alt}></Preview.Images>
              </Icon.Avatar>
            </ContainerComponent.InlineGroup>
            <ContainerComponent.InlineGroup style={{
              margin: '0 10px'
            }}>
              <Text.Title>{postHeader.hideAuthor && 'Anonymous' || postHeader.username}</Text.Title>
              <ContainerComponent.Flex>
                <Text.Date style={{
                  marginRight: '8px',
                  marginTop: "4px"
                }}>{parseTime(postHeader.date)}</Text.Date>
              </ContainerComponent.Flex>
            </ContainerComponent.InlineGroup>
            {(user.accountId === postHeader.postAuthor || [roles.QA_COORDINATOR, roles.QA_MANAGER].includes(user.role)) && <Text.RightLine>
              <DropDownButton position="right" component={<IoIosArrowDown></IoIosArrowDown>}>
                {postHeader.postAuthor === user.accountId &&
                  <Dropdown.Item>
                    <Link to={`/portal/idea/${postHeader.id}`}>
                      <Text.Line>
                        <Text.MiddleLine>
                          <Icon>
                            <FaRegEdit></FaRegEdit>
                          </Icon>
                        </Text.MiddleLine>
                        <Text.MiddleLine>
                          Edit
                        </Text.MiddleLine>
                      </Text.Line>
                    </Link>
                  </Dropdown.Item>
                }
                <Dropdown.Item>
                  <Text.Line onClick={() => deleteSinglePost(postHeader.id)}>
                    <Text.MiddleLine>
                      <Icon>
                        <FaEraser></FaEraser>
                      </Icon>
                    </Text.MiddleLine>
                    <Text.MiddleLine>
                      Delete
                    </Text.MiddleLine>
                  </Text.Line>
                </Dropdown.Item>
                {user.role === roles.QA_MANAGER && <Dropdown.Item>
                  <Text.Line onClick={downloadHandler}>
                    <Text.MiddleLine>
                      <Icon>
                        <HiDownload></HiDownload>
                      </Icon>
                    </Text.MiddleLine>
                    <Text.MiddleLine>
                      Download
                    </Text.MiddleLine>
                  </Text.Line>
                </Dropdown.Item>}
              </DropDownButton>
            </Text.RightLine>}
          </ContainerComponent.Pane>


          <ContainerComponent.Pane className="post__body">
            <Text.Paragraph style={{ padding: "0px 10px" }}>
              {postBody.content}
            </Text.Paragraph>
            {!!postBody.attachment.length && <GridPreview files={postBody.attachment}></GridPreview>}
          </ContainerComponent.Pane>

          <ContainerComponent.Pane className="post__footer" style={{ background: '#DCE7D7', boxShadow: '1px 1px .5px solid #000', borderRadius: "10px" }}>
            <ContainerComponent.GridThreeColumns style={{ margin: "15px 0 5px 0" }}>
              <ContainerComponent.Item>
                <Text.MiddleLine>
                  <input type='checkbox' name="like" id={`like ${postHeader.id}`} value={isLiked} onChange={checkedHandler} style={{ display: 'none' }}></input>
                  <Icon.CircleIcon
                    onClick={() => {
                      document.getElementById(`like ${postHeader.id}`).click();
                    }}
                    style={{ marginRight: '10px', color: '#fff', position: 'relative', }}>
                    <FaThumbsUp stroke='#163D3C'
                      strokeWidth={20}
                      style={{ fill: `${isLiked ? '#163D3C' : 'transparent'}`, fontWeight: "600", color: "#b0b3b8", position: "absolute", top: '50%', transform: 'translate(-50%,-50%)', left: '50%' }} />
                  </Icon.CircleIcon>
                  {like}
                </Text.MiddleLine>
              </ContainerComponent.Item>

              <ContainerComponent.Item>
                <Text.MiddleLine>
                  <input type='checkbox'
                    name="dislike"
                    id={`dislike ${postHeader.id}`}
                    value={isDisliked}
                    onChange={checkedHandler}
                    style={{ display: 'none' }}></input>
                  <Text.CenterLine>
                    <Icon.CircleIcon
                      onClick={() => {
                        document.getElementById(`dislike ${postHeader.id}`).click();
                      }}
                      style={{
                        marginRight: '10px',
                        background: '#fff',
                        position: 'relative',
                      }}>
                      <FaThumbsDown stroke='#163D3C' strokeWidth={20} style={{
                        fill: `${isDisliked ? '#163D3C' : 'transparent'}`,
                        position: "absolute",
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        left: '50%'
                      }} />
                    </Icon.CircleIcon>
                    {dislike}
                  </Text.CenterLine>
                </Text.MiddleLine>
              </ContainerComponent.Item>

              <ContainerComponent.Item onClick={() => {
                if (!openComment) {
                  getComment.current(postHeader.id, (res) => {
                    setOpenComment(true);
                  });
                }
                else {
                  setOpenComment(false);
                }
              }}>
                <Text.AbsoluteMiddle>
                  <Text.CenterLine style={{ cursor: "pointer", fontWeight: "500", color: "#353535" }}>
                    Comment ({postFooter.comment})
                  </Text.CenterLine>
                </Text.AbsoluteMiddle>
              </ContainerComponent.Item>

            </ContainerComponent.GridThreeColumns>
          </ContainerComponent.Pane>
          {
            openComment && <Comment
              postAuthor={postHeader.postAuthor}
              postId={postHeader.id}
              commentLogs={postFooter.comments}
            ></Comment>
          }
        </ContainerComponent.Section>
      </ContainerComponent.Inner>
    </ContainerComponent.Inner>
  );
}
