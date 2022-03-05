import React, { useRef } from "react";
import { ContainerComponent, List } from "../../components";
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
  const { user } = useAuthorizationContext();
  const { workspace } = useWorkspaceContext();
  const { posts, removeIdea, loadNextPosts, filterPost } = usePostContext();
  const [postAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
  const listRef = useRef();
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
              likedAccounts,
              dislikedAccounts,
              comment,
              hideAuthor,
            } = post;
console.log(post);
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
                const { _id, fileType, filePath } = attach;
                return {
                  _id,
                  image: `${host}\\${filePath}`,
                  fileType,
                };
              }),
            };
            let postFooter = {
              like: likedAccounts.length,
              dislike: dislikedAccounts.length,
              isLiked: likedAccounts.indexOf(user.accountId) > -1,
              isDisliked: dislikedAccounts.indexOf(user.accountId) > -1,
              likedAccounts,
              dislikedAccounts,
              comment,
            };
            return (
              <List.Item key={post._id}>
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
