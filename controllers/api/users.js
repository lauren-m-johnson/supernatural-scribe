const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

// Middleware function to check the validity of a token
function checkToken(req, res) {
  // Log the authenticated user's data
  console.log('req.user', req.user);

  // Respond with the expiration time of the token
  res.json(req.exp);
}

// Create a new user
async function create(req, res) {
  try {
    // Create a new user based on the data from the request body
    const user = await User.create(req.body);

    // Generate a JWT token for the user and respond with it
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Log in a user
async function login(req, res) {
  try {
    // Find a user by their email
    const user = await User.findOne({ email: req.body.email });
    
    // If no user is found, throw an error
    if (!user) throw new Error();
    
    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    
    // If passwords don't match, throw an error
    if (!match) throw new Error();
    
    // Generate a JWT token for the user and respond with it
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions --*/

// Create a JSON Web Token (JWT) for a user
function createJWT(user) {
  return jwt.sign(
    { user },                  // Payload: user data
    process.env.SECRET,        // Secret key to sign the token
    { expiresIn: '24h' }       // Token expiration time
  );
}