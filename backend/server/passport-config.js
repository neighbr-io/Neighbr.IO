// passport-config.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function initializePassport() {
  passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'http://localhost:8000/api/auth/oauth2/redirect/google',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists
      let user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value },
      });

      if (!user) {
        // Create a new user if not exists
        user = await prisma.user.create({
          data: {
            accountTypeId: 2,
            email: profile.emails[0].value,
            // password: "bikebike",
            // You can set other properties here if needed
          },
        });
      }

      return done(null, user);
    } catch (error) {
      console.log("newerror", error);
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initializePassport;