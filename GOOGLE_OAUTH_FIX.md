# Fixing Google OAuth Redirect URI Mismatch

The error "Error 400: redirect_uri_mismatch" occurs because the redirect URI configured in your Google Cloud Console doesn't match the one used in your application.

## Steps to Fix:

1. **Go to Google Cloud Console**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project

2. **Update OAuth Credentials**:
   - Navigate to "APIs & Services" > "Credentials"
   - Find your OAuth 2.0 Client ID and click on it to edit
   - Under "Authorized redirect URIs", add the following URI:
     ```
     http://localhost:3000/api/auth/google/callback
     ```
   - Make sure this matches EXACTLY with the callbackURL in your passport.config.js file
   - Click "Save"

3. **Verify Configuration**:
   - Make sure your backend .env file has the correct values:
     ```
     APP_URL = http://localhost:3000/
     GOOGLE_CLIENT_ID = "your-client-id"
     GOOGLE_CLIENT_SECRET = "your-client-secret"
     ```

4. **Restart Your Application**:
   - Restart both frontend and backend servers
   - Try the Google login again

## Alternative Solution:

If you can't access the Google Cloud Console to update the redirect URI, you can modify your application to match the configured URI:

1. Check what redirect URI is configured in Google Cloud Console
2. Update your passport.config.js file to use that URI:

```javascript
callbackURL: "your-configured-redirect-uri",
```

Remember that the redirect URI must be an exact match, including trailing slashes and protocol (http vs https).
