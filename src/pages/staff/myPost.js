import React, { useState } from 'react'
import { Loading } from '..';
import { ContainerComponent, List } from '../../components';
import { Filter, LazyLoading, PostContainer, PostForm } from '../../containers';
import { usePostContext, useAuthorizationContext } from '../../redux';
import axios from 'axios';

export default function MyPost() {
    const { user } = useAuthorizationContext();
    const { myPosts, getOwnPosts, loadMyNextPosts, filterMyPost, removeIdea } = usePostContext();
    const mountedRef = React.useRef(false);
    const listRef = React.useRef();
    // const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const cancelTokenSource = axios.CancelToken.source();

    React.useEffect(() => {
        mountedRef.current = true;
        if (mountedRef.current) {
            getOwnPosts();
        }
        return () => {
            mountedRef.current = false;
            cancelTokenSource.cancel();
        };
    }, []);

    return (<ContainerComponent style={{ background:"#A9C39E"}} className="workspace" id="workspace">
        <ContainerComponent.Inner className="myPost__header">
            <PostForm></PostForm>
            <Filter loader={filterMyPost} selectOptions={[
                {
                    label: 'Most Recent',
                    value: 2
                },
                {
                    label: 'Most Likely',
                    value: 3
                }
            ]}></Filter>
        </ContainerComponent.Inner>
        <LazyLoading loader={loadMyNextPosts}>
            <List className="workspace__postList" ref={listRef}>
                {/* {!myPosts.length && <List.Item>
                    <Text.Center>Loading...</Text.Center>
                </List.Item>} */}
                {myPosts.map((post) => {
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
                        comments
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
                        comments
                    };
                    return (
                        <List.Item key={post._id}
                            id={post._id}>
                            <PostContainer
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
    )
}
