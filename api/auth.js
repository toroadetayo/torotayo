export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const { state } = req.query;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `https://${req.headers.host}/api/callback`,
    scope: 'repo,user',
    state: state || '',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
