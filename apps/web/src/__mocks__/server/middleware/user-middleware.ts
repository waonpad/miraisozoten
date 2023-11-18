import { RestRequest } from 'msw';
import { JwtDecodedUser } from 'schema/dist/user';

export const userMiddleware = async (req: RestRequest): Promise<RestRequest> => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return req;
  }

  try {
    // fb-toolsパッケージのlib/admin-server.jsでサーバーを立ててトークンの検証を行っている
    const decodedResponse = await fetch('http://localhost:3010/firebase/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const decoded: JwtDecodedUser = await decodedResponse.json();

    req.user = decoded;

    return req;
  } catch (error) {
    console.error(error);

    return req;
  }
};
