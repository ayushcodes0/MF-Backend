const axios = require("axios");

const MFAPI_BASE = "https://api.mfapi.in/mf";

async function fetchNAVBySchemeCode(schemeCode) {
  const url = `${MFAPI_BASE}/${schemeCode}`;

  const response = await axios.get(url, {
    timeout: 20000
  });

  return response.data;
}

module.exports = {
  fetchNAVBySchemeCode
};
