import * as admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "./firebaseconfig.json"), "utf-8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
