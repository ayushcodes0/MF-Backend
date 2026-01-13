const axios = require("axios");

const AMFI_SCHEME_URL =
  "https://portal.amfiindia.com/DownloadSchemeData_Po.aspx?mf=0";

async function fetchAMFISchemeMaster() {
  const response = await axios.get(AMFI_SCHEME_URL, {
    timeout: 30000,
    responseType: "text"
  });

  return response.data;
}

module.exports = {
  fetchAMFISchemeMaster
};
