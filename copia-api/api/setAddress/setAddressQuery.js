const gql = require('graphql-tag');

module.exports = gql`
  mutation (
    $customer: PartnerInput = null
    $receivingAgentId: Int = null
    $remoteCustomer: PartnerInput = null
  ) {
    setAddress (
      customer: $customer
      receivingAgentId: $receivingAgentId
      remoteCustomer: $remoteCustomer
    ) {
      customerId {
        id
        name
        phone
      }
      remoteCustomerId {
        id
        name
        phone
      }
      receivingAgentId {
        id
        name
        phone
      }
      id
      name
      orderLines {
        id
        name
        quantity
      }
      amountTotal
      stage
    }
  }
`