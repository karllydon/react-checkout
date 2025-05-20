import { get as _get } from 'lodash-es';

export default function modifyCaseDetails(result) {
  return _get(result, 'data.getCheckoutCustomerDetails');
}
