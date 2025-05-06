import LocalStorage from '../../utils/localStorage';

const initialState = {
  checkoutAgreements: {},
  marketingOptIn: {
    email: false,
    post: false,
  },
  countriesLoaded: [],
  countryList: [],
  customer: {},
  customerAddressList: {},
  defaultBillingAddress: '',
  defaultShippingAddress: '',
  isLoggedIn: !!LocalStorage.getCustomerToken(),
  message: false,
  pageLoader: false,
  stateList: {},
};

export default initialState;
