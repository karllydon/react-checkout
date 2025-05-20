import sendRequest from '../../sendRequest';
import { GET_CASE_INFO_QUERY } from './query';
import modifier from './modifier';

export default async function fetchCustomerAddresses(dispatch, caseId) {
  const variables = {
    caseId,
  };

  return modifier(
    await sendRequest(dispatch, { query: GET_CASE_INFO_QUERY, variables })
  );
}
