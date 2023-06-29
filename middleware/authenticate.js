const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_RENDER_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};


const isAuthenticated = (req, res, next) => {
  if (req.user === undefined) { 
    return res.status(401).json({ error: 'User not authenticated' });
  }
  next();
};

module.exports = { config, isAuthenticated };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// // test
// app.get('/test', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify('Hello World'));
// });
