import { Avatar, Badge } from "antd";
import React from "react";
import styles from "./styles.module.css";
import { useSubscription } from "@apollo/client";
import { POST_COUNT_SUBSCRIPTION } from "./queries";

function PostConuter() {
  const { loading, data } = useSubscription(POST_COUNT_SUBSCRIPTION);

  return (
    <div className={styles.container}>
      <Badge count={loading ? "?" : data.postCount} size="small">
        <Avatar shape="square" size="medium ">
          <span className={styles.counterTitle}>Post</span>
        </Avatar>
      </Badge>
    </div>
  );
}

export default PostConuter;
