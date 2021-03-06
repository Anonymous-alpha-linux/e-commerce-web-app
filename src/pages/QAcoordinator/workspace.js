import React, { useRef, useState } from "react";
import {
    ContainerComponent,
    List,
    AnimateComponent,
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
    useNotifyContext,
    usePostContext,
    useWorkspaceContext,
} from "../../redux";

export default function Workspace() {
    const { user } = useAuthorizationContext();
    const { workspace } = useWorkspaceContext();
    const { posts, loadNextPosts, filterPost } = usePostContext();

    const [blockWorkspace, setBlockWorkspace] = useState(false);
    const listRef = useRef();

    return (
        <ContainerComponent className="workspace" id="workspace">
            <ContainerComponent.Inner className="workspace__form">
                <ContainerComponent.Inner className="workspace__innerForm">
                    <Timespan style={{ width: "100vw" }} expireTime={workspace.expireTime} setBlockWorkspace={setBlockWorkspace}></Timespan>
                    {!blockWorkspace && <PostForm></PostForm>}
                    <Filter loader={filterPost}
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
                </ContainerComponent.Inner>
            </ContainerComponent.Inner>
            <LazyLoading loader={loadNextPosts}>
                <List style={{ borderRadius: "10px", background: "#A9C39E" }} className="workspace__postList" ref={listRef}>
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
                            <AnimateComponent.Zoom key={`${post._id}-${index}`}>
                                <List.Item id={post._id}>
                                    <PostContainer
                                        postId={_id}
                                        postHeader={postHeader}
                                        postBody={postBody}
                                        postFooter={postFooter}
                                    ></PostContainer>
                                </List.Item>
                            </AnimateComponent.Zoom>
                        );
                    })}
                </List>
            </LazyLoading>
        </ContainerComponent>
    );
}
