import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

let storage = null

export function initFirebaseFromEnv() {
  if (storage) return storage

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  const appId = import.meta.env.VITE_FIREBASE_APP_ID

  if (!apiKey || !projectId || !storageBucket) {
    return null
  }

  const app = initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  })

  storage = getStorage(app)
  return storage
}

export async function uploadFileToFirebase(file) {
  const storageInstance = initFirebaseFromEnv()
  if (!storageInstance) throw new Error('Firebase is not configured. Set VITE_FIREBASE_* env vars')

  const key = `leads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
  const storageRef = ref(storageInstance, key)

  await uploadBytesResumable(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
