import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get('https://dapi.kakao.com/trend-keyword/v2/keywords.json', {
        headers: {
          'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`,
          'Ka': 'origin/https://www.daum.net os/javascript'
        },
        params: {
          w: 'trend_keyword',
          random: 2,
          n: 200
        }
      });

      console.log('✅ [랜덤=2] 카카오 응답 데이터:', response.data);
      res.status(200).json(response.data);
    } catch (error) {
      try {
        const fallbackResponse = await axios.get('https://dapi.kakao.com/trend-keyword/v2/keywords.json', {
          headers: {
            'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`,
            'Ka': 'origin/https://www.daum.net os/javascript'
          },
          params: {
            w: 'trend_keyword',
            random: 1,
            n: 200
          }
        });

        console.log('✅ [랜덤=1] fallback 응답 데이터:', fallbackResponse.data);
        res.status(200).json(fallbackResponse.data);
      } catch (fallbackError) {
        console.error('❌ fallbackError 발생:', fallbackError.response?.data || fallbackError.message);
        res.status(fallbackError.response?.status || 500).json(
          fallbackError.response?.data || { error: fallbackError.message }
        );
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
