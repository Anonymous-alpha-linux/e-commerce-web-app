import React, { useState, useRef } from "react";
import { ContainerComponent, Icon, Text, Preview, Dropdown } from "../components";
import { FaThumbsUp, FaThumbsDown, FaRegEdit, FaEraser } from "react-icons/fa";
import { IoIosArrowDown } from 'react-icons/io';
import { HiDownload } from 'react-icons/hi';
import { Comment, DropDownButton, GridPreview } from ".";
import { useAuthorizationContext, useNotifyContext, usePostContext } from "../redux";
import { Link } from "react-router-dom";
import { roles } from "../fixtures";
// import { notifyData, socketTargets } from "../fixtures";

export default function Post({ postHeader, postBody, postFooter }) {
  const interactTypes = {
    NO: 'no rate',
    LIKE: 'like',
    DISLIKE: 'dislike',
  }
  const { user } = useAuthorizationContext();
  const { interactPost, getPostComments, deleteSinglePost } = usePostContext();
  const { sendNotification } = useNotifyContext();
  const isFirstRender = useRef(true);
  const interactRef = useRef(interactPost);
  const getComment = useRef(getPostComments);

  const [openComment, setOpenComment] = useState(false);
  const [interact, setInteract] = useState({ liked: postFooter.isLiked, disliked: postFooter.isDisliked });
  const [type, setType] = useState(interactTypes.NO);

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
  // const downloadZIPFile = async (e) => {
  //   console.log(postBody);
  //   return Promise.all(
  //     postBody.attachment.map((attach) => {
  //       return new Promise((resolve, reject) => {
  //         getFile(attach, (file) => {
  //           console.log(file);
  //           resolve(file);
  //         }).catch((error) => {
  //           reject(error);
  //         });
  //       });
  //     })
  //   ).then((files) => {
  //     console.log(files);
  //     return getGzipFile(files);
  //   });
  // };
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

  React.useEffect(() => {
    getComment.current = getPostComments;
  }, [getPostComments])
  React.useEffect(() => {
    if (!isFirstRender.current) {
      interactPost(postHeader.id, type, interact, commentId => {
        // console.log(commentId);
      });
    }
  }, [interact]);
  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    interactRef.current = interactPost;
  }, [interactRef]);

  return (
    <ContainerComponent.Section
      className="post__section"
      style={{
        padding: "10px 20px",
      }}
    >
      <ContainerComponent.Pane className="post__header">
        <ContainerComponent.InlineGroup>
          <Icon.Avatar style={{
            verticalAlign: 'middle',
            background: '#163d3c',
            color: '#fff'
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
              marginRight: '8px'
            }}>{parseTime(postHeader.date)}</Text.Date>
          </ContainerComponent.Flex>
        </ContainerComponent.InlineGroup>
        {(user.accountId === postHeader.postAuthor || [roles.QA_COORDINATOR, roles.QA_MANAGER].includes(user.role)) && <Text.RightLine>
          <DropDownButton component={<IoIosArrowDown></IoIosArrowDown>}>
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
              <Text.Line>
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
        <Text.Paragraph>
          {postBody.content}
        </Text.Paragraph>
        {!!postBody.attachment.length && <GridPreview files={postBody.attachment}></GridPreview>}
      </ContainerComponent.Pane>


      <ContainerComponent.Pane className="post__footer" style={{
        background: '#EEF5EB',
        boxShadow: '1px 1px .5px solid #000'
      }}>
        <ContainerComponent.GridThreeColumns>
          <ContainerComponent.Item>
            <Text.MiddleLine>
              <input type='checkbox'
                name="like"
                id={`like ${postHeader.id}`}
                value={interact.liked}
                onChange={checkedHandler}
                style={{ display: 'none' }}></input>
              <Icon.CircleIcon
                onClick={() => {
                  setType(interactTypes.LIKE);
                  document.getElementById(`like ${postHeader.id}`).click();
                }}
                style={{
                  marginRight: '10px',
                  color: '#fff',
                  position: 'relative',
                }}>
                <FaThumbsUp stroke='#000'
                  strokeWidth={20}
                  style={{
                    fill: `${interact.liked ? 'blue' : 'transparent'}`,
                    position: "absolute",
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    left: '50%'
                  }} />
              </Icon.CircleIcon>
              {postFooter.like}
            </Text.MiddleLine>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Text.MiddleLine>
              <input type='checkbox'
                name="dislike"
                id={`dislike ${postHeader.id}`}
                value={interact.disliked}
                onChange={checkedHandler}
                style={{ display: 'none' }}></input>
              <Text.CenterLine>
                <Icon.CircleIcon
                  onClick={() => {
                    setType(interactTypes.DISLIKE);
                    document.getElementById(`dislike ${postHeader.id}`).click();
                  }}
                  style={{
                    marginRight: '10px',
                    color: '#fff',
                    position: 'relative',
                  }}>
                  <FaThumbsDown stroke='#000' strokeWidth={20} style={{
                    fill: `${interact.disliked ? 'blue' : 'transparent'}`,
                    position: "absolute",
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    left: '50%'
                  }} />
                </Icon.CircleIcon>
                {postFooter.dislike}
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
              <Text.CenterLine>
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
  );
}
