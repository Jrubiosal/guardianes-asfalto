// Firebase configuration
// Replace with your own Firebase config or use environment variables
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query } from 'firebase/firestore';

// Firebase config - Replace with your actual config
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
let app;
let auth;
let db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.warn("Firebase initialization failed. Running in demo mode.", error);
}

const appId = import.meta.env.VITE_APP_ID || 'guardianes-asfalto';

// Auth functions
export const initAuth = async () => {
    if (!auth) return null;
    try {
        await signInAnonymously(auth);
    } catch (error) {
        console.error("Auth error:", error);
    }
};

export const subscribeToAuthChanges = (callback) => {
    if (!auth) return () => { };
    return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const subscribeToUserRoutes = (callback) => {
    if (!db) {
        callback([]);
        return () => { };
    }

    try {
        const publicDataQuery = query(
            collection(db, 'artifacts', appId, 'public', 'data', 'user_routes')
        );

        return onSnapshot(publicDataQuery, (snapshot) => {
            const routes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(routes);
        }, (error) => {
            console.error("Firestore error:", error);
            callback([]);
        });
    } catch (error) {
        console.error("Firestore subscription error:", error);
        callback([]);
        return () => { };
    }
};

export const addRoute = async (route, userId) => {
    if (!db) {
        console.warn("Firestore not available. Route saved locally only.");
        return null;
    }

    try {
        const newRoute = {
            ...route,
            createdBy: userId,
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(
            collection(db, 'artifacts', appId, 'public', 'data', 'user_routes'),
            newRoute
        );
        return docRef.id;
    } catch (error) {
        console.error("Error saving route:", error);
        throw error;
    }
};

export { auth, db };
