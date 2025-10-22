# Bootcamp Tracker - React Presentation App

A React application for presenting bootcamp content with Firebase integration to track completion rates across attendees.

## Features

- 📚 **Content Display**: Rich text formatting support for your bootcamp content
- 🔥 **Firebase Integration**: Real-time completion tracking 
- 📊 **Progress Statistics**: See completion count and percentage
- 📱 **Responsive Design**: Works on desktop and mobile for presentations
- ✅ **One-Click Completion**: Simple "I Completed" button for attendees

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase** (Required):
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Realtime Database
   - Copy your Firebase config and update `src/firebase.js`
   - Replace the placeholder values with your actual Firebase configuration

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Navigate to `http://localhost:5174` (or whatever port Vite assigns)

## Firebase Setup

1. Go to Firebase Console and create a new project
2. Enable **Realtime Database** (not Firestore)
3. Set database rules for public write access (for demo purposes):
   ```json
   {
     "rules": {
       "completions": {
         ".write": true,
         ".read": true
       }
     }
   }
   ```

4. Get your Firebase config from Project Settings > General > Your apps
5. Update `src/firebase.js` with your actual configuration

## Customizing Content

Edit the `bootcampSections` array in `src/App.jsx` to add your own content with **bold**, *italic*, and `code` formatting support.

## How Completion Tracking Works

1. Each attendee clicks "I Completed This!" button
2. A record is added to Firebase Realtime Database
3. All connected users see the updated completion count in real-time
4. Local storage prevents duplicate submissions from same browser

## Production Build

```bash
npm run build
```

Good luck with your presentation! 🚀

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
