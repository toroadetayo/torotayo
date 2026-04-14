export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      res.status(400).send(`
        <script>
          window.opener.postMessage(
            'authorization:github:error:${JSON.stringify(tokenData)}',
            window.location.origin
          );
          window.close();
        </script>`);
      return;
    }

    res.send(`
      <script>
        const token = ${JSON.stringify(tokenData.access_token)};
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({ token, provider: 'github' }),
          window.location.origin
        );
        window.close();
      </script>`);
  } catch (err) {
    res.status(500).send(`
      <script>
        window.opener.postMessage(
          'authorization:github:error:' + ${JSON.stringify(err.message)},
          window.location.origin
        );
        window.close();
      </script>`);
  }
}
