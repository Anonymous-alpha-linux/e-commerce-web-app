import React, { useRef } from "react";
import {
  BarChart,
  ButtonComponent,
  ContainerComponent,
  List,
} from "../../components";
import {
  Filter,
  LazyLoading,
  PostContainer,
  PostForm,
  Timespan,
} from "../../containers";
import { mainAPI } from "../../config";
import {
  useAuthorizationContext,
  usePostContext,
  useWorkspaceContext,
} from "../../redux";

export default function Workspace() {
  const { user, socket } = useAuthorizationContext();
  const { workspace } = useWorkspaceContext();
  const { posts, removeIdea, loadNextPosts, filterPost } = usePostContext();
  const [postAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
  const listRef = useRef();
  console.log(user);
  return (
    <ContainerComponent className="workspace" id="workspace">
      <Timespan expireTime={workspace.expireTime}></Timespan>
      <PostForm></PostForm>
      <Filter
        loader={filterPost}
        selectOptions={[
          {
            label: "Most Recent",
            value: 0,
          },
          {
            label: "Most Liked",
            value: 1,
          },
        ]}
      ></Filter>
      <LazyLoading loader={loadNextPosts}>
        <List className="workspace__postList" ref={listRef}>
          {posts.map((post) => {
            const {
              _id,
              postAuthor,
              content,
              attachment,
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
              attachment: attachment.map((attach) => {
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
            return (
              <List.Item key={post._id} id={post._id}>
                <PostContainer
                  postId={_id}
                  postHeader={postHeader}
                  postBody={postBody}
                  postFooter={postFooter}
                  removeIdea={() => removeIdea(_id)}
                ></PostContainer>
              </List.Item>
            );
          })}
        </List>
      </LazyLoading>
    </ContainerComponent>
  );
}
