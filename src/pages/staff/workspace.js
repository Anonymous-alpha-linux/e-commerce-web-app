import React, { useEffect, useState } from "react";
import { List } from "../../components";
import { Filter, PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from '../../config';
import { useAuthorizationContext, useWorkspaceContext } from "../../redux";
import { Loading } from "../";

export default function Workspace() {
  const API = mainAPI.CLOUD_API_STAFF;
  const { user, cancelTokenSource } = useAuthorizationContext();
  const { workspace, loading } = useWorkspaceContext();
  console.log(loading);
  if (loading) return <Loading></Loading>

  return (
    <div className="workspace">
      <Timespan expireTime={workspace.expireTime}></Timespan>
      <PostForm></PostForm>
      <Filter></Filter>
      <List>
        {workspace.posts.map(post => {
          const { postAuthor, content, attachment, like, dislike, comment } = post;
          const postHeader = {
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
                image: `${mainAPI.CLOUD_HOST}\\${filePath}`,
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
            <PostContainer postHeader={postHeader} postBody={postBody} postFooter={postFooter}></PostContainer>
          </List.Item>
        }
        )}
      </List>
    </div>
  );
}
