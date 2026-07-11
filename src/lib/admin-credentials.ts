// Admin credentials for the static-gated /admin page.
// The password is bcrypt-hashed; the plaintext is NOT stored here.
// On GitHub Pages this is a public bundle, so treat it as obscurity, not security —
// appropriate for a small admin demo, not a real production app.

// Hash of "thirdspace.cs.uoft" (bcrypt, cost 10)
// Generated and verified locally.
export const ADMIN_EMAIL = "thirdspace.cs.uoft@gmail.com";
export const ADMIN_PASSWORD_HASH =
  "$2b$10$H2E2M6doQJCfjbX3fE7E/e.9hha6WJERwYbI.1aMKWvbI18/LywKC";
