const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getStorage } = require("firebase-admin/storage");

const app = admin.initializeApp({
  credential: admin.credential.cert("serviceAccount.json"),
  storageBucket: "gs://pawscapstone-72851.appspot.com", // Ganti dengan ID proyek Firebase Anda
});

const auth = getAuth();
const storage = getStorage();

module.exports = { auth, storage };
