export const GET_CASE_INFO_QUERY = `
query GetCheckoutCustomerDetails ($caseId: String!){
  getCheckoutCustomerDetails(caseId: $caseId) {
    email
    name
  }
}
`;
