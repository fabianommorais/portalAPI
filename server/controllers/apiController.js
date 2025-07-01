const apiService = require('../services/apiService');

exports.handleApiRequest = async (req, res) => {
  try {
    const { method, url, headers, body, auth } = req.body;
    
    // Autorização (exemplo)
    if (url.includes('//api.privada.com') && !auth?.token) {
      return res.status(401).json({ error: 'Autenticação necessária' });
    }

    const response = await apiService.makeRequest({
      method,
      url,
      headers,
      data: body,
      auth
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Erro no proxy:', error?.response?.data || error.message || error);
    res.status(500).json({
      error: 'Falha na integração',
      details: error?.response?.data || error.message || error
    });
  }
};
