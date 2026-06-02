import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* =========================
   お知らせ読み込み
========================= */
async function loadAnnouncements() {

  const container =
    document.getElementById("announcements");

  if (!container) return;

  try {

    const snapshot =
      await getDocs(collection(db, "announcements"));

    let html = "";

    snapshot.forEach((doc) => {

  const data = doc.data();

  const date = new Date(data.createdAt).toLocaleString("ja-JP");

  html += `
    <div>
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <small>${date}</small>
      <hr>
    </div>
  `;
});

    if (html === "") {
      html = "<p>まだお知らせはありません</p>";
    }

    container.innerHTML = html;

  } catch (error) {

    console.error("読み込みエラー:", error);

    container.innerHTML =
      "お知らせの取得に失敗しました";
  }
}

/* =========================
   投稿処理
========================= */
async function postAnnouncement() {

  alert("投稿処理スタート");

  const title =
    document.getElementById("title").value;

  const content =
    document.getElementById("content").value;

  if (!title || !content) {
    alert("タイトルと内容を入力してください");
    return;
  }

  try {

    await addDoc(
      collection(db, "announcements"),
      {
        title,
        content,
        createdAt: new Date().toISOString()
      }
    );

    document.getElementById("message")
      .innerText = "投稿完了！";

    location.reload();

  } catch (error) {

    console.error("投稿エラー:", error);

    document.getElementById("message")
      .innerText = "投稿失敗";
  }
}

/* =========================
   イベント登録
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("postBtn");

  if (btn) {
    btn.addEventListener("click", postAnnouncement);
  }

  loadAnnouncements();
});
