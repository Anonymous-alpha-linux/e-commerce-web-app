import React from "react";
import { List } from "../../components";
import { Filter, PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from "../../config";
import { usePostContext, useWorkspaceContext } from "../../redux";

export default function Workspace() {
  const { workspace } = useWorkspaceContext();
  const { posts, removeIdea, loadNextPosts, filterPost } = usePostContext();
  const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];

  return (
    <div className="workspace" id="workspace">
      <Timespan expireTime={workspace.expireTime}></Timespan>
      <PostForm></PostForm>
      <Filter></Filter>
      <List className="workspace__postList">
        {posts.map((post) => {
          const {
            _id,
            postAuthor,
            content,
            attachment,
            like,
            dislike,
            comment,
            hideAuthor,
          } = post;
          const postHeader = {
            id: _id,
            postAuthor: postAuthor._id,
            image: postAuthor.profileImage,
            alt: postAuthor.username,
            username: postAuthor.username,
            date: post.createdAt,
            hideAuthor,
          };
          const postBody = {
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
          const postFooter = {
            like,
            dislike,
            comment,
          };
          return (
            <List.Item key={post._id}>
              <PostContainer
                postHeader={postHeader}
                postBody={postBody}
                postFooter={postFooter}
                removeIdea={() => removeIdea(_id)}
              ></PostContainer>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
