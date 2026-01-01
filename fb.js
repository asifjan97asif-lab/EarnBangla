firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
});

const auth = firebase.auth();
const db = firebase.firestore();