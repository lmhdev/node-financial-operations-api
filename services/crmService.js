const crmData = require("../mock/crmData");

const getCRMData = () => {
  return crmData;
};

const getClientContact = (clientId) => {
  return crmData.find((client) => client.id === clientId);
};

module.exports = {
  getCRMData,
  getClientContact,
};
