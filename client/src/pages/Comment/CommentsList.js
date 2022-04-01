import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import { Divider, Button } from "antd";
import { Comment, List } from "antd";

import { useLazyQuery } from "@apollo/client";
import { COMMENTS_SUBSCRIPTIONS, GET_POST_COMMENTS } from "../Post/queries";
import NewCommentForm from "./NewCommentForm";

function CommentsList({ post_id }) {
  const [btnVisible, setBtnIsVisible] = useState(true);

  const [loadComments, { called, loading, data, subscribeToMore }] =
    useLazyQuery(GET_POST_COMMENTS, {
      variables: { id: post_id },
    });

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: COMMENTS_SUBSCRIPTIONS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newCommentItem = subscriptionData.data.commentCreated;
          return {
            post: {
              ...prev.post,
              comments: [...prev.post.comments, newCommentItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore]);

  useEffect(() => {
    if (!loading && data) {
      setBtnIsVisible(false);
    }
  }, [loading, data]);

  return (
    <>
      <Divider orientation="left">Comments</Divider>
      {btnVisible && (
        <div className={styles.showComment}>
          <Button loading={loading} onClick={() => loadComments()}>
            Show Comments
          </Button>
        </div>
      )}
      {!loading && data && (
        <>
          <List
            className="comment-list"
            header={`${data.post.comments.length} replies`}
            itemLayout="horizontal"
            dataSource={data.post.comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.user.fullName}
                  avatar={item.user.profile_photo}
                  content={item.text}
                />
              </li>
            )}
          />
          <Divider orientation="left">New Comment</Divider>
          <NewCommentForm post_id={post_id} />
        </>
      )}
    </>
  );
}

export default CommentsList;
