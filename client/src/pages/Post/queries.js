import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      title
      description
      cover
      user {
        id
        fullName
      }
    }
  }
`;

const commentFragment = gql`
  fragment CommentsFragment on Comment {
    id
    text
    user {
      fullName
      profile_photo
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getComments($id: ID!) {
    post(id: $id) {
      comments {
        ...CommentsFragment
      }
    }
  }
  ${commentFragment}
`;

export const COMMENTS_SUBSCRIPTIONS = gql`
  subscription commentCreated($post_id: ID) {
    commentCreated(post_id: $post_id) {
      ...CommentsFragment
    }
  }
  ${commentFragment}
`;
