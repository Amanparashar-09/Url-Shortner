# Setting Up Google OAuth for URL Shortener

This guide will help you set up Google OAuth for your URL shortener application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page and select "New Project"
3. Enter a name for your project and click "Create"
4. Once the project is created, select it from the project dropdown

## Step 2: Configure the OAuth Consent Screen

1. In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the user type and click "Create"
3. Fill in the required information:
   - App name: URL Shortener
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue"
5. On the "Scopes" page, click "Add or Remove Scopes" and add the following scopes:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`
6. Click "Save and Continue"
7. Add any test users if needed, then click "Save and Continue"
8. Review your settings and click "Back to Dashboard"

## Step 3: Create OAuth Client ID

1. In the left sidebar, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. Select "Web application" as the application type
4. Enter a name for your client ID (e.g., "URL Shortener Web Client")
5. Add the following authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5174` (or your frontend URL)
6. Add the following authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
7. Click "Create"
8. You will see a modal with your client ID and client secret. Copy these values.

## Step 4: Update Your .env File

1. Open the `.env` file in your backend directory
2. Update the following variables with your Google OAuth credentials:
   ```
   GOOGLE_CLIENT_ID = "your-client-id"
   GOOGLE_CLIENT_SECRET = "your-client-secret"
   ```

## Step 5: Restart Your Application

1. Restart your backend server to apply the changes
2. Test the Google login functionality by clicking the "Sign in with Google" button on the login page

## Troubleshooting

- If you encounter CORS issues, make sure your frontend URL is correctly set in the CORS configuration in `app.js`
- If the redirect doesn't work, check that your callback URL is correctly set in both the Google Cloud Console and your backend code
- Check the server logs for any error messages related to Google authentication
