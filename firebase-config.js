// Firebase 前端設定（給公開網頁用的，可以公開，不是機密）
// 專案：my-teaching-tools-7cc8a
export const firebaseConfig = {
  apiKey: "AIzaSyAJhqsn04vvGpUsL5fGbubDpSxeOoagckg",
  authDomain: "my-teaching-tools-7cc8a.firebaseapp.com",
  projectId: "my-teaching-tools-7cc8a",
  storageBucket: "my-teaching-tools-7cc8a.firebasestorage.app",
  messagingSenderId: "380614302106",
  appId: "1:380614302106:web:b167205fe6b7fde3b34223"
};

// Firestore 集合名稱（需與 firestore.rules 的白名單一致）
export const COLLECTION = "wordcloud_words";

// Firebase JS SDK 版本（CDN）
export const SDK_VERSION = "13.0.0";
