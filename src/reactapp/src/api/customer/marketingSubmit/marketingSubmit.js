import sendRequest from '../../sendRequest';
import { MARKETING_SUBMIT_MUTATION } from './mutation';
import LocalStorage from '../../../utils/localStorage';

export default async function marketingSubmit(dispatch, email, post) {
  const variables = {
    masked_quote_id: LocalStorage.getCartId(),
    email_opt_in: email,
    post_opt_in: post,
  };

  return sendRequest(dispatch, {
    query: MARKETING_SUBMIT_MUTATION,
    variables,
  });
}
