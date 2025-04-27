import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get('https://dapi.kakao.com/trend-keyword/v2/keywords.json', {
        headers: {
          'Authorization': process.env.KAKAO_API_KEY,
          'Ka': 'origin/https://www.daum.net os/javascript',
          'Content-Type': 'application/json'
        },
        params: {
          w: 'trend_keyword',
          random: 2,
          n: 100
        }
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
