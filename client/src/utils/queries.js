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

export const QUERY_BUSINESSES = gql`
  query businesses {
    {search
      (term: "Coffee", location: "san francisco") {
        business {
          name
          rating
          review_count
          location {
            address1
          }
        }
      }
    }
`;