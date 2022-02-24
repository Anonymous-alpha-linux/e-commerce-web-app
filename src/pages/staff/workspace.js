import React from "react";
import { List } from "../../components";
import { Filter, PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from '../../config';
import { useWorkspaceContext } from "../../redux";

export default function Workspace() {
  const { workspace } = useWorkspaceContext();

  return (
    <div className="workspace">
      <Timespan
        expireTime={workspace.expireTime}>
      </Timespan>
      <PostForm></PostForm>
      <Filter></Filter>
      <List>
        {workspace.posts.map(post => {
          const { _id, postAuthor, content, attachment, like, dislike, comment } = post;
          const postHeader = {
            id: _id,
            image: postAuthor.profileImage,
            alt: postAuthor.username,
            username: postAuthor.username,
            date: post.createdAt
          }
          const postBody = {
            content,
            attachment: attachment.map(attach => {
              const { _id, fileType, filePath } = attach;
              return {
                _id,
                image: `${mainAPI.LOCALHOST_HOST}\\${filePath}`,
                fileType
              }
            })
          }
          const postFooter = {
            like,
            dislike,
            comment
          }
          return <List.Item key={post._id}>
            <PostContainer postHeader={postHeader}
              postBody={postBody}
              postFooter={postFooter}></PostContainer>
          </List.Item>
        }
        )}
      </List>
    </div>
  );
}
