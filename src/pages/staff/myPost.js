import React from 'react'
import { Loading } from '..';
import { List } from '../../components';
import { mainAPI } from '../../config';
import { PostContainer } from '../../containers';
import { usePostContext } from '../../redux';

export default function MyPost() {
    const { myPosts, getOwnPosts, removeIdea } = usePostContext();
    const [loading, setLoading] = React.useState(true);
    const [postAPI, host] = process.env.REACT_APP_ENVIRONMENT === 'development' ? [mainAPI.LOCALHOST_STAFF, mainAPI.LOCALHOST_HOST] : [mainAPI.CLOUD_API_STAFF, mainAPI.CLOUD_HOST];
    React.useEffect(() => {
        setLoading(true);
        getOwnPosts().then(f => setLoading(false));
    }, []);

    if (loading) return <Loading></Loading>

    return (
        <div>
            <List className="workspace__postList">
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
        </div>
    )
}
