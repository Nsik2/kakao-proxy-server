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
      // random=2 요청이 실패하면 random=1로 재시도
      try {
        const fallbackResponse = await axios.get('https://dapi.kakao.com/trend-keyword/v2/keywords.json', {
          headers: {
            'Authorization': process.env.KAKAO_API_KEY,
            'Ka': 'origin/https://www.daum.net os/javascript',
            'Content-Type': 'application/json'
          },
          params: {
            w: 'trend_keyword',
            random: 1,
            n: 100
          }
        });

        res.status(200).json(fallbackResponse.data);
      } catch (fallbackError) {
        res.status(fallbackError.response?.status || 500).json(
          fallbackError.response?.data || { error: fallbackError.message }
        );
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
