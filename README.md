# Neighbr.IO

At Neighbr.io, we've simplified the path to mutual success and community strength through a unique pledge system. Here’s how it unfolds:

1. Pledge & Support: Community members, like you, pledge financial support to local businesses through Neighbr.io. This isn’t a loan; it’s a vote of confidence in the potential of neighborhood businesses.

2. Offer & Thank: In return for your pledge, businesses don’t pay back with money plus interest. Instead, they offer their services or products as a heartfelt expression of gratitude, most definitely with a big discount!

3. Strengthen & Grow: This exchange fosters a robust ecosystem where businesses grow without the burden of financial debt, and supporters enjoy local services, enriching the community bond.

# How to Run the Project Locally

1. Ensure your .env file contains the following:
JWT_SECRET=LvN65DmWsVsnbJoPvN2ukTC8fwy
DATABASE_URL="postgres://yourusername:@localhost:5432/neighbr-io?schema=public"
STRIPE_SECRET_KEY = <your stripe secret key here>
STRIPE_PUBLISHABLE_KEY = <>
STATIC_DIR = ./frontend

2. Check that you have prisma installed and run the seed data
    
3. Double check the backend data was loaded properly by running: npx prisma studio

4. npm run start

Backend README: backend/README.md
