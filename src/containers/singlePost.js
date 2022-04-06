import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ButtonComponent, ContainerComponent, Icon, Preview, Text } from '../components'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useAuthorizationContext, usePostContext } from '../redux';
import Comment from './comment';
import axios from 'axios';
import { mainAPI } from '../config';
import { toastTypes } from '../fixtures';
export default function SinglePost() {
  const { user, pushToast } = useAuthorizationContext();
  const { getSinglePost, interactPost, getPostComments, deleteSinglePost } = usePostContext();

  const { postId } = useParams();
  const { state } = useLocation();

  const isFirstRender = useRef(true);
  const interactRef = useRef(interactPost);
  const getComment = useRef(getPostComments);

  const [openComment, setOpenComment] = useState(false);

  const [index, setIndex] = useState(0);
  const [post, setPost] = useState(state);

  const host = process.env.REACT_APP_ENVIRONMENT === "development" ? mainAPI.LOCALHOST_HOST : mainAPI.CLOUD_HOST;

  useEffect(() => {
    getSinglePost(postId, post => {
      const {
        _id,
        postAuthor,
        content,
        attachments,
        like,
        dislike,
        likedAccounts,
        dislikedAccounts,
        comment,
        hideAuthor,
        comments,
      } = post;
      let postHeader = {
        id: _id,
        postAuthor: postAuthor._id,
        image: postAuthor.profileImage,
        alt: postAuthor.username,
        username: postAuthor.username,
        date: post.createdAt,
        hideAuthor,
      };
      let postBody = {
        content,
        attachment: attachments.map((attach) => {
          const { _id, fileType, online_url, filePath, fileFormat } =
            attach;
          return {
            _id,
            image: `${online_url || filePath}`,
            fileType,
            fileFormat,
          };
        }),
      };
      let postFooter = {
        like,
        dislike,
        isLiked: likedAccounts.indexOf(user.accountId) > -1,
        isDisliked: dislikedAccounts.indexOf(user.accountId) > -1,
        likedAccounts,
        dislikedAccounts,
        comment,
        comments,
      };
      setPost({ ...postHeader, ...postBody, ...postFooter });
    });
  }, [postId]);
  React.useEffect(() => {
    getComment.current = getPostComments;
  }, [getPostComments]);
  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);
  React.useEffect(() => {
    interactRef.current = interactPost;
  }, [interactRef]);

  const nextSlide = () => {
    setIndex(index === post.attachment.length - 1 ? 0 : index + 1)
  };
  const prevSlide = () => {
    setIndex(index === 0 ? post.attachment.length - 1 : index - 1)
    if (!Array.isArray(post.attachment) || post.attachment.length <= 0) {
      return null;
    }
  }
  const checkedHandler = async (e) => {
    if (e.target.name === "like") {
      likeHandler();
    } else if (e.target.name === "dislike") {
      dislikeHandler();
    }
    // interactRef.current(postHeader.id, 'rate', { like: !isLiked ? like + 1 : like - 1, dislike: !isDisliked ? dislike + 1 : dislike - 1, likedAccounts: [...likedAccounts, user.accountId], dislikedAccounts: [...dislikedAccounts, user.accountId], isDisliked: !isDisliked, isLiked: !isLiked });
  };
  const likeHandler = () => {
    interactRef.current(post.id, "rate", {
      like: !post.isLiked ? post.like + 1 : post.like - 1,
      dislike: post.isDisliked ? post.dislike - 1 : post.dislike,
      likedAccounts: !post.isLiked
        ? [...post.likedAccounts, user.accountId]
        : post.likedAccounts.filter((acc) => acc !== user.accountId),
      dislikedAccounts: post.isDisliked
        ? post.dislikedAccounts.filter((acc) => acc !== user.accountId)
        : post.dislikedAccounts,
      isLiked: !post.isLiked,
      isDisliked: false,
    }, res => {
      console.log(res);
    });
  };
  const dislikeHandler = () => {
    interactRef.current(post.id, "rate", {
      like: post.isLiked ? post.like - 1 : post.like,
      dislike: !post.isDisliked ? post.dislike + 1 : post.dislike - 1,
      likedAccounts: post.isLiked
        ? post.likedAccounts.filter((acc) => acc !== user.accountId)
        : post.likedAccounts,
      dislikedAccounts: !post.isDisliked
        ? [...post.dislikedAccounts, user.accountId]
        : post.dislikedAccounts.filter((acc) => acc !== user.accountId),
      isLiked: false,
      isDisliked: !post.isDisliked,
    });
  };
  const downloadHandler = async (e) => {
    return axios
      .get(`${host}/api/v1/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "post",
          postid: post.id,
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
      .catch((err) => pushToast({
        message: 'Cannot download this item',
        type: toastTypes.ERROR,
      }));
  };
  const parseTime = (time) => {
    const today = new Date();
    const endDate = new Date(time);

    const days = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60 * 60));
    const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60));
    const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000));
    console.log(days);
    if (seconds < 60) return `${seconds} second ago`;
    else if (minutes < 60) return `${minutes} minutes ago`;
    else if (hours < 60) return `${hours} hours ago`;
    else if (days < 10) return `${days} days ago`;
    return `${new Date(time).toLocaleString("en-us", { dateStyle: "full" })}`;
  };

  return (
    <ContainerComponent>
      <ContainerComponent.Inner>
        {post?.content}
        <ContainerComponent.Pane className="post__footer" style={{ background: '#DCE7D7', boxShadow: '1px 1px .5px solid #000', borderRadius: "10px" }}>
          <ContainerComponent.GridThreeColumns style={{ margin: "15px 0 5px 0" }}>
            <ContainerComponent.Item>
              <Text.MiddleLine>
                <input type='checkbox' name="like" id={`like ${post?.id}`} value={post?.isLiked} onChange={checkedHandler} style={{ display: 'none' }}></input>
                <Icon.CircleIcon
                  onClick={() => {
                    document.getElementById(`like ${post.id}`).click();
                  }}
                  style={{ marginRight: '10px', color: '#fff', position: 'relative', }}>
                  <FaThumbsUp stroke='#163D3C'
                    strokeWidth={20}
                    style={{ fill: `${post?.isLiked ? '#163D3C' : 'transparent'}`, fontWeight: "600", color: "#b0b3b8", position: "absolute", top: '50%', transform: 'translate(-50%,-50%)', left: '50%' }} />
                </Icon.CircleIcon>
                {post?.like}
              </Text.MiddleLine>
            </ContainerComponent.Item>

            <ContainerComponent.Item>
              <Text.MiddleLine>
                <input type='checkbox'
                  name="dislike"
                  id={`dislike ${post?.id}`}
                  value={post?.isDisliked}
                  onChange={checkedHandler}
                  style={{ display: 'none' }}></input>
                <Text.CenterLine>
                  <Icon.CircleIcon
                    onClick={() => {
                      document.getElementById(`dislike ${post?.id}`).click();
                    }}
                    style={{
                      marginRight: '10px',
                      background: '#fff',
                      position: 'relative',
                    }}>
                    <FaThumbsDown stroke='#163D3C' strokeWidth={20} style={{
                      fill: `${post?.isDisliked ? '#163D3C' : 'transparent'}`,
                      position: "absolute",
                      top: '50%',
                      transform: 'translate(-50%,-50%)',
                      left: '50%'
                    }} />
                  </Icon.CircleIcon>
                  {post?.dislike}
                </Text.CenterLine>
              </Text.MiddleLine>
            </ContainerComponent.Item>

            <ContainerComponent.Item onClick={() => {
              if (!openComment) {
                getComment.current(post?.id, (res) => {
                  setPost(post => ({ ...post, comments: res }))
                  setOpenComment(true);
                });
              }
              else {
                setOpenComment(false);
              }
            }}>
              <Text.AbsoluteMiddle>
                <Text.CenterLine style={{ cursor: "pointer", fontWeight: "500", color: "#353535" }}>
                  Comment ({post?.comment})
                </Text.CenterLine>
              </Text.AbsoluteMiddle>
            </ContainerComponent.Item>

          </ContainerComponent.GridThreeColumns>
        </ContainerComponent.Pane>
        {
          openComment && <Comment
            postAuthor={post?.postAuthor}
            postId={post?.id}
            commentLogs={post?.comments}
          ></Comment>
        }
      </ContainerComponent.Inner>
      <ContainerComponent.Flex style={{ position: "relative", overflow: "hiden" }}>
        <ContainerComponent.Item style={{ height: '50%', width: "100%", padding: "0", flexGrow: "1", position: "relative" }}>
          <ContainerComponent.Pane className={"side"} style={{ position: "relative", overflow: 'hidden' }}>
            {post?.attachment?.map((imageItems, imageIndex) => {
              return (
                <ContainerComponent.Item className={imageIndex === index ? 'slide active' : 'slide'} key={imageIndex} style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", padding: "0", flexGrow: "1", flexBasic: "100%", flexShrink: "0", overflow: "hiden" }}>
                  {imageIndex === index && (<Preview.Images image={imageItems.image} style={{ width: "100%", height: "100%" }}></Preview.Images>)}
                </ContainerComponent.Item>
              )
            })}
          </ContainerComponent.Pane>
          <ContainerComponent.Pane className={"buttonn__couple"}>
            <ButtonComponent onClick={prevSlide} className={"buttonn"}>
              <Icon>
                <BiChevronLeft></BiChevronLeft>
              </Icon>
            </ButtonComponent>
            <ButtonComponent onClick={nextSlide} className={"buttonn"}>
              <Icon>
                <BiChevronRight></BiChevronRight>
              </Icon>
            </ButtonComponent>
          </ContainerComponent.Pane>
        </ContainerComponent.Item>
        {/* <ContainerComponent.Item>
          
        </ContainerComponent.Item> */}
      </ContainerComponent.Flex>

    </ContainerComponent>
  )
}
