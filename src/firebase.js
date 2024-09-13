// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const playerScoresRef = ref(database, 'playerScores')

// Connection status
let isConnected = false

const connectionRef = ref(database, '.info/connected')
onValue(connectionRef, (snapshot) => {
    try {
      isConnected = snapshot.val()
    } catch (error) {
        // Handle the error silently
        //   console.error("Connection error:", error) // Optional: log to console if needed
    }
  })

export { app, isConnected, playerScoresRef }