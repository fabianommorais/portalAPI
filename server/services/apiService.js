const axios = require('axios');

module.exports = {
  async makeRequest({ method, url, headers, data, auth }) {
    // Adicionar credenciais de API se necessário
    const finalHeaders = { ...headers };
    
    if (auth) {
      finalHeaders.Authorization = `Bearer ${auth.token}`;
      // Ou para Basic Auth: `Basic ${Buffer.from(`${auth.user}:${auth.pass}`).toString('base64')}`
    }

    const config = {
      method: method || 'GET',
      url,
      headers: finalHeaders,
      data: method !== 'GET' ? data : undefined,
      timeout: 10000
    };

    const response = await axios(config);
    return response;
  }
};
