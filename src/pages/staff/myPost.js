import React, { useState } from 'react'
import { Loading } from '..';
import { ContainerComponent, List } from '../../components';
import { mainAPI } from '../../config';
import { Filter, LazyLoading, PostContainer, PostForm } from '../../containers';
import { usePostContext } from '../../redux';
import axios from 'axios';

export default function MyPost() {
    const [loading, setLoading] = useState(true);
    const { myPosts, getOwnPosts, loadMyNextPosts, filterMyPost, removeIdea } = usePostContext();
    const listRef = React.useRef();
    const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    const cancelTokenSource = axios.CancelToken.source();

    React.useEffect(() => {
        console.log(myPosts);
        getOwnPosts(() => {
            console.log('get own posts');
            setLoading(false
            );
        });
        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    if (loading) return <Loading></Loading>
    return (<ContainerComponent className="workspace" id="workspace">
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
        <LazyLoading loader={loadMyNextPosts}>
            <List className="workspace__postList" ref={listRef}>
                {!myPosts.length && <List.Item>
                    Loading...
                </List.Item>}
                {myPosts.map((post) => {
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
        </LazyLoading>
    </ContainerComponent>
    )
}