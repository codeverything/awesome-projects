const getDefaultScopeNoTimestamp = () => {
  return {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  }
}

function injectTransactionToValidate() {
  return {
    beforeValidate(instance, options) {
      // eslint-disable-next-line no-param-reassign
      instance.injectTransactionData = {}
      if (options.transaction) {
        // eslint-disable-next-line no-param-reassign
        instance.injectTransactionData.transaction = options.transaction
      }
    },
    afterValidate(instance, options) {
      // eslint-disable-next-line no-param-reassign
      delete instance.injectTransactionData
    },
  }
}

module.exports = {
  getDefaultScopeNoTimestamp,
  injectTransactionToValidate,
}
