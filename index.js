const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const KAKAO_API_KEY = 'KakaoAK 8da6e83ec6f6b1da277b545cbb944102'; // 카카오 API 키

app.get('/kakao', async (req, res) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/trend-keyword/v2/keywords.json', {
      headers: {
        'Authorization': KAKAO_API_KEY,
        'Ka': 'origin/https://www.daum.net os/javascript',
        'Content-Type': 'application/json'
      },
      params: {
        w: req.query.w,
        random: req.query.random,
        n: req.query.n
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Kakao Proxy Server is running!');
});

module.exports = app;
