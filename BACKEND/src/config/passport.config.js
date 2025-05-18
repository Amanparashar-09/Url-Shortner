import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findUserByGoogleId, findUserByEmail, createGoogleUser } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

// Configure Passport to use Google OAuth
const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists with this Google ID
          let user = await findUserByGoogleId(profile.id);

          if (!user) {
            // If user doesn't exist with Google ID, check if email exists
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
            if (email) {
              user = await findUserByEmail(email);
            }

            // If user doesn't exist at all, create a new one
            if (!user) {
              const name = profile.displayName || 'Google User';
              const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : undefined;

              user = await createGoogleUser(
                name,
                email,
                profile.id,
                avatar
              );
            }
          }

          // Generate JWT token
          const token = signToken({ id: user._id });

          return done(null, { user, token });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  // Serialize user to session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default setupPassport;
