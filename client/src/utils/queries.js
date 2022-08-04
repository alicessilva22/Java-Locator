import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const YELP_SEARCH = gql`
  query shops($term: String, $location: String) {
  search(term:$term, location:$location) {
    businesses {
        name
      rating
      review_count
      location {
        display_address
      }
      url
      image_url
    }
  }
`;