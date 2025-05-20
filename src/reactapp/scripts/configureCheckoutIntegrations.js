const configureShippingMethods = require('./integrations/configureShippingMethods');

module.exports = (async () => {
  try {
    await configureShippingMethods();
  } catch (error) {
    console.error(error);
  }
})();
