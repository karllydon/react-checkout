const {
  REACT_APP_BASE_URL: baseUrl, // don't use, interferes with 'proxy' in package.json
  REACT_APP_LANGUAGE: language,
  REACT_APP_STORE_CODE: storeCode,
  REACT_APP_CURRENCY_CODE: currencyCode,
  REACT_APP_CURRENCY_SYMBOL: currencySymbol,
  REACT_APP_DEFAULT_COUNTRY: defaultCountry,
} = process.env;

export default {
  baseUrl,
  language,
  storeCode,
  currencyCode,
  currencySymbol,
  defaultCountry,
};
