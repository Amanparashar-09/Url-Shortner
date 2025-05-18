# Exact Google OAuth Redirect URI

To fix the "Error 400: redirect_uri_mismatch" error, you need to configure the **exact** redirect URI in your Google Cloud Console.

## The Exact URI to Configure

```
http://localhost:3000/api/auth/google/callback
```

## Steps to Update in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Find your OAuth 2.0 Client ID and click on it to edit
4. Under "Authorized redirect URIs", make sure you have the exact URI above
   - If there's a similar URI with any differences (even a trailing slash), remove it
   - Add the exact URI shown above
5. Click "Save"

## Important Notes

- The URI must match **exactly**, including:
  - Protocol (`http://`)
  - Domain (`localhost`)
  - Port (`3000`)
  - Path (`/api/auth/google/callback`)
  - No trailing slash
- If you're still getting the error after updating, try:
  - Clearing your browser cache
  - Using an incognito/private browsing window
  - Waiting a few minutes for Google's changes to propagate

## Verification

After updating the redirect URI in Google Cloud Console, try the Google login again. If configured correctly, you should no longer see the "redirect_uri_mismatch" error.
