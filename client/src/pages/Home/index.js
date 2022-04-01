import { React, useEffect } from "react";

import styles from "./styles.module.css";

import { List, Avatar } from "antd";
import { useQuery } from "@apollo/client";
import { GET_POSTS, POSTS_SUBSCRIPTION } from "./queries";
import { Link } from "react-router-dom";
import Loading from "components/Loading";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS);

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          posts: [subscriptionData.data.postCreated, ...prev.posts],
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data.posts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.profile_photo} />}
              title={<Link to={`/post/${item.id}`}>{item.title}</Link>}
              description={
                <Link to={`/post/${item.id}`} className={styles.listItem}>
                  {item.short_description}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
