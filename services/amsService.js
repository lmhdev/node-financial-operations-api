const amsData = require("../mock/amsData");

const getAMSData = () => {
  return amsData;
};

const getInvoiceDetails = (clientId) => {
  return amsData.find((client) => client.id === clientId);
};

module.exports = {
  getAMSData,
  getInvoiceDetails,
};
