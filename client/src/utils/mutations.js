import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const FAVORITE = gql`
  mutation favorite(
    $id: ID,
    $name: String,
    $rating: Float,
    $review_count: Int,
    $url: String,
    $image_url: String
  ) {
    favorite(
      id: $id,
      name: $name,
      rating: $rating,
      review_count: $review_count,
      url: $url,
      image_url: $image_url
    ) {
      _id
      username
      email
      favorites {
        id
        name
        rating
        review_count
        url
        image_url
      }
    }
  }
`;
