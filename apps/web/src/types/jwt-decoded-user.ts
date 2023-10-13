export type JwtDecodedUser = {
  aud: string; // Googleがアプリケーションに対して発行したクライアントID
  azp: string; // Googleがアプリケーションに対して発行したクライアントID
  email: string; // ユーザのメールアドレス
  email_verified: boolean; // ユーザのメールアドレスが確認済みかどうか
  exp: number; // トークンの有効期限
  family_name: string; // ユーザの姓(ラストネーム)
  given_name: string; // ユーザの名字(ファーストネーム)
  iat: number; // トークンの発行時刻
  iss: string; // トークンの発行者
  jti: string; // JWTの一意識別子
  locale: string; // ユーザの地域設定
  name: string; // ユーザの名前
  nbf: number; // トークンの有効期限の開始時刻
  picture: string; // ユーザのプロフィール画像のURL
  sub: string; // ユーザのGoogleID(JWTの主体の識別子)
};
