# Khansa's Birthday Website (no Firebase)

Plain HTML/CSS/JS plus one tiny serverless function that stores the chat. Everything is free on Netlify and needs no other account.

## File structure
```
khansa-birthday/
├── index.html, admin.html, css/style.css
├── js/config.js              ← EDIT ALL TEXT, DATE AND SONGS HERE
├── js/util.js, app.js, admin.js
├── audio/                    song1.mp3 … song4.mp3
├── netlify/functions/chat.mjs   the chat backend (stores messages)
├── netlify.toml, package.json
```
Why a function? A purely static host can't receive messages. This one function does, with no database setup.

## Deploy (free)
Drag-and-drop does NOT run functions, so use one of these:

**A. GitHub + Netlify (recommended)**
1. Push this folder to a new private GitHub repo.
2. Netlify → Add new site → Import from Git → pick the repo. Leave build settings as they are.
3. Site configuration → Environment variables → add `ADMIN_PASSWORD` = a strong password only you know.
4. Deploys → Trigger deploy. You get a link like `https://xxxx.netlify.app`. Rename it under Site configuration → Change site name.

**B. Netlify CLI**
```
npm install
npm i -g netlify-cli
netlify login
netlify init            # create & link a new site
netlify env:set ADMIN_PASSWORD "your-strong-password"
netlify deploy --prod
```

## Use it
- Her link: `https://your-site.netlify.app`
- Your inbox: `https://your-site.netlify.app/admin`. Sign in with `ADMIN_PASSWORD`, tap **Enable alerts**, keep the tab open.
- You get a chime and a browser notification when she opens the site or sends a message. She sees "Hamza is online" while your admin tab is open.
- Messages arrive within about 3 seconds (the pages check for new ones every 3 seconds).

## Test locally
`npm install && npx netlify dev`, then open http://localhost:8888 and http://localhost:8888/admin (set `ADMIN_PASSWORD` in a `.env` file: `ADMIN_PASSWORD=test123`).

## Notes
- Notifications only work while the admin tab is open. Background push needs a service worker and a push service, which this version leaves out.
- Anyone with her link can read and post in the chat, so share it only with her. Only you can post as Hamza (your password is checked on the server).
- Use music you have the right to use.
