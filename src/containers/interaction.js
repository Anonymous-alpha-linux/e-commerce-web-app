import React, { useRef, useState, useEffect } from 'react'
import { Text, Icon } from '../components';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAuthorizationContext } from '../redux';

function Interaction({ like, dislike, likedAccounts, dislikedAccounts, entity, interactLoader, children, ...props }) {
    const { user } = useAuthorizationContext();
    const [interact, setInteract] = useState({
        liked: !!likedAccounts.find((acc) => acc === user.accountId),
        disliked: !!dislikedAccounts.find((acc) => acc === user.accountId),
        ...entity,
    });
    const interactLoaderRef = useRef(interactLoader);

    const checkedHandler = async (e) => {
        if (e.target.name === "like") {
            setInteract({
                ...interact,
                liked: !interact.liked,
                disliked: interact.disliked && false,
            });
            interactLoaderRef.current({
                ...interact,
                liked: !interact.liked,
                disliked: interact.disliked && false,
            });
        }
        if (e.target.name === "dislike") {
            setInteract({
                ...interact,
                disliked: !interact.disliked,
                liked: interact.liked && false,
            });
            interactLoaderRef.current({
                ...interact,
                disliked: !interact.disliked,
                liked: interact.liked && false,
            })
        }
    };
    // const likeHandler = () => {
    //     interactLoader.current(postHeader.id, 'rate', {
    //         like: !isLiked ? like + 1 : like - 1,
    //         dislike: isDisliked ? dislike - 1 : dislike,
    //         likedAccounts: !isLiked ? [...likedAccounts, user.accountId] : likedAccounts.filter(acc => acc !== user.accountId),
    //         dislikedAccounts: isDisliked ? dislikedAccounts.filter(acc => acc !== user.accountId) : dislikedAccounts,
    //         isLiked: !isLiked,
    //         isDisliked: false,
    //     });
    // }
    // const dislikeHandler = () => {
    //     interactLoader.current(postHeader.id, 'rate', {
    //         like: isLiked ? like - 1 : like,
    //         dislike: !isDisliked ? dislike + 1 : dislike - 1,
    //         likedAccounts: isLiked ? likedAccounts.filter(acc => acc !== user.accountId) : likedAccounts,
    //         dislikedAccounts: !isDisliked ? [...dislikedAccounts, user.accountId] : dislikedAccounts.filter(acc => acc !== user.accountId),
    //         isLiked: false,
    //         isDisliked: !isDisliked,
    //     });
    // }
    useEffect(() => {
        interactLoaderRef.current = interactLoader;
    }, [interactLoader]);
    return (
        <Text.Line className="interacts">
            <Text.MiddleLine className="like">
                <input
                    type="checkbox"
                    name="like"
                    id={`like - ${props._id} `}
                    value={interact.liked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input>
                <Icon.CircleIcon
                    className="likeIcon"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                        document.getElementById(`like - ${props._id} `).click();
                    }}
                >
                    <FaThumbsUp
                        stroke="#163D3C"
                        strokeWidth={20}
                        style={{
                            fill: `${interact.liked ? "#163D3C" : "transparent"} `,
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%,-50%)",
                            left: "50%",
                        }}
                    />
                </Icon.CircleIcon>
                {like}
            </Text.MiddleLine>

            <Text.MiddleLine className="dislike" style={{ margin: "0 10px" }}>
                <input
                    type="checkbox"
                    name="dislike"
                    id={`dislike ${props._id} `}
                    value={interact.disliked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input>
                <Icon.CircleIcon
                    className="dislikeIcon"
                    style={{marginRight:"5px"}}
                    onClick={() => {
                        document.getElementById(`dislike ${props._id} `).click();
                    }}
                >
                    <FaThumbsDown
                        stroke="#163D3C"
                        strokeWidth={20}
                        style={{
                            fill: `${interact.disliked ? "#163D3C" : "transparent"} `,
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%,-50%)",
                            left: "50%",
                        }}
                    />
                </Icon.CircleIcon>
                {dislike}
            </Text.MiddleLine>
            <Text.MiddleLine className="another__container">
                {children}
            </Text.MiddleLine>
        </Text.Line>
    )
}

export default Interaction