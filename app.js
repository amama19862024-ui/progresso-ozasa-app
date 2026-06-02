import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* =========================
   ログイン状態
========================= */
let user = null;

/* =========================
   Googleログイン
========================= */
window.login = async function () {

  const provider = new GoogleAuthProvider();

  try {

    const result = await signInWithPopup(auth, provider);
    user = result.user;

    alert("ログイン成功：" + user.displayName);

    loadAnnouncements();

  } catch (error) {

    console.error(error);
    alert("ログイン失敗");
  }
};

/* =========================
   ログアウト
========================= */
window.logout = async function () {

  await signOut(auth);
  user = null;

  alert("ログアウトしました");

  loadAnnouncements();
};

/* =========================
   認証監視
========================= */
onAuthStateChanged(auth, (u) => {
  user = u;
  loadAnnouncements();
});

/* =========================
   投稿
========================= */
async function postAnnouncement() {

  if (!user) {
    alert("ログインしてください");
    return;
  }

  const title =
    document.getElementById("title").value;

  const content =
    document.getElementById("content").value;

  if (!title || !content) {
    alert("入力してください");
    return;
  }

  await addDoc(collection(db, "announcements"), {
    title,
    content,
    createdAt: new Date().toISOString(),
    uid: user.uid,
    name: user.displayName
  });

  alert("投稿完了");
  location.reload();
}

/* =========================
   削除
========================= */
window.deleteAnnouncement = async function (id, uid) {

  if (!user || user.uid !== uid) {
    alert("削除権限がありません");
    return;
  }

  if (!confirm("削除しますか？")) return;

  await deleteDoc(doc(db, "announcements", id));

  alert("削除しました");
  location.reload();
};

/* =========================
   読み込み
========================= */
async function loadAnnouncements() {

  const container = document.getElementById("announcements");

  if (!container) return;

  const q = query(
    collection(db, "announcements"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  let html = "";

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();
    const id = docSnap.id;

    const date = new Date(data.createdAt).toLocaleString("ja-JP");

    html += `
      <div>
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>${date}</small>

        ${user && user.uid === data.uid
          ? `<button onclick="deleteAnnouncement('${id}','${data.uid}')">削除</button>`
          : ""
        }

        <hr>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* =========================
   初期化
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("postBtn");

  if (btn) {
    btn.addEventListener("click", postAnnouncement);
  }

  loadAnnouncements();
});
