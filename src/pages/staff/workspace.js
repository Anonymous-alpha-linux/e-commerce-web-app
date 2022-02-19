import React, { useEffect, useState } from "react";
import axios from 'axios';
import { List } from "../../components";
import { PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from '../../config';
import { useAuthorizationContext } from "../../redux";
import { Loading } from "..";
import { unstable_batchedUpdates } from "react-dom";

export default function Workspace() {
  const API = mainAPI.LOCALHOST_STAFF;
  const { user, workspace, setWorkspace, cancelTokenSource } = useAuthorizationContext();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(API, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      params: {
        view: 'workspace',
        page: page
      }
    }).then(res => {
      unstable_batchedUpdates(() => {
        setWorkspace(res.data.workspace);
      })
    }).catch(error => console.log(error.message))
      .finally(() => setLoading(false));
    return () => {
      cancelTokenSource.cancel();
    }
  }, []);

  useEffect(() => {
    if (workspace) {
      setPosts(workspace.posts)
    }
  }, [workspace]);

  if (loading) return <Loading></Loading>

  return (
    <div className="workspace">
      <Timespan expireTime={workspace.expireTime}></Timespan>
      <PostForm></PostForm>
      <List>
        {posts && posts.map(post => {
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
            <PostContainer postHeader={postHeader} postBody={postBody} postFooter={postFooter}></PostContainer>
          </List.Item>
        }
        )}
      </List>
    </div>
  );
}
