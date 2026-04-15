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
          (function () {
            const message = 'authorization:github:error:${JSON.stringify(tokenData)}';
            if (window.opener) {
              window.opener.postMessage(message, '*');
            }
            // Give the message loop a tick before closing.
            setTimeout(function () { window.close(); }, 100);
          })();
        </script>`);
      return;
    }

    res.send(`
      <script>
        (function () {
          const token = ${JSON.stringify(tokenData.access_token)};
          const message = 'authorization:github:success:' + JSON.stringify({ token, provider: 'github' });
          if (window.opener) {
            window.opener.postMessage(message, '*');
          }
          // Give the message loop a tick before closing.
          setTimeout(function () { window.close(); }, 100);
        })();
      </script>`);
  } catch (err) {
    res.status(500).send(`
      <script>
        (function () {
          const message = 'authorization:github:error:' + ${JSON.stringify(err.message)};
          if (window.opener) {
            window.opener.postMessage(message, '*');
          }
          // Give the message loop a tick before closing.
          setTimeout(function () { window.close(); }, 100);
        })();
      </script>`);
  }
}
