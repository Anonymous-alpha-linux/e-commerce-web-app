import React, { useRef, useState } from "react";
import { ButtonComponent, ContainerComponent, List } from "../../components";
import {
  Filter,
  LazyLoading,
  PostContainer,
  PostForm,
  Timespan,
  Toast,
} from "../../containers";
import { toastTypes } from "../../fixtures";
import { mainAPI } from "../../config";
import {
  useAuthorizationContext,
  useNotifyContext,
  usePostContext,
  useWorkspaceContext,
} from "../../redux";

export default function Workspace() {
  const { user } = useAuthorizationContext();
  const { workspace } = useWorkspaceContext();
  const { posts, removeIdea, loadNextPosts, filterPost } = usePostContext();
  const { sendMessageToSpecificPerson } = useNotifyContext(true);

  const [blockWorkspace, setBlockWorkspace] = useState(false);

  const [postAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
  const listRef = useRef();

  return (
    <ContainerComponent className="workspace" id="workspace">
      <Timespan
        expireTime={workspace.expireTime}
        setBlockWorkspace={setBlockWorkspace}
      ></Timespan>
      {!blockWorkspace && <PostForm></PostForm>}
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
          {posts.map((post, index) => {
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
            return (
              <List.Item key={`${post._id}-${index}`} id={post._id}>
                <PostContainer
                  postId={_id}
                  postHeader={postHeader}
                  postBody={postBody}
                  postFooter={postFooter}
                ></PostContainer>
              </List.Item>
            );
          })}
        </List>
      </LazyLoading>
    </ContainerComponent>
  );
}
