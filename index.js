const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// 환경변수로부터 API 키를 읽는다
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

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
