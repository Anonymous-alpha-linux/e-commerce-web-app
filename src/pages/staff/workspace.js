import React, { useEffect, useState } from "react";
import { List } from "../../components";
import { Filter, PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from "../../config";
import {
  useAuthorizationContext,
  usePostContext,
  useWorkspaceContext,
} from "../../redux";
import { Loading } from "../";

export default function Workspace() {
  const API = mainAPI.CLOUD_API_STAFF;
  const { workspace, loading } = useWorkspaceContext();
  const { posts, categories } = usePostContext();
  const { user } = useAuthorizationContext();

  useEffect(() => {
    console.log("workspace data:", workspace);
    console.log("post data:", posts);
    console.log("category data:", categories);
    console.log("user data", user);
  }, [workspace, posts, categories, user]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="workspace">
      <Timespan expireTime={workspace.expireTime}></Timespan>
      <PostForm></PostForm>
      <Filter></Filter>
      <List>
        {workspace.posts.map((post) => {
          const { postAuthor, content, attachment, like, dislike, comment } =
            post;
          const postHeader = {
            image: postAuthor.profileImage,
            alt: postAuthor.username,
            username: postAuthor.username,
            date: post.createdAt,
          };
          const postBody = {
            content,
            attachment: attachment.map((attach) => {
              const { _id, fileType, filePath } = attach;
              return {
                _id,
                image: `${mainAPI.LOCALHOST_HOST}\\${filePath}`,
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
              ></PostContainer>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
