const gql = require('graphql-tag');

const updatePassword = async (context, params) => {
    const apolloClient = context.client.apollo;
    const response = await apolloClient.mutate({
      variables: params,
      mutation: gql`
        mutation($currentPassword: String!, $newPassword: String!){
          updatePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            id
          }
        }`,
    });

    return response;
}

module.exports = updatePassword;