import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* =========================
   コーチ認証（簡易）
========================= */
const COACH_PASSWORD = "1234"; // ←ここ好きな数字に変更OK
let isCoach = false;

/* =========================
   ログイン処理
========================= */
function coachLogin() {

  const input = prompt("コーチパスワードを入力してください");

  if (input === COACH_PASSWORD) {
    isCoach = true;
    alert("コーチモードON");
  } else {
    alert("パスワードが違います");
  }
}

/* =========================
   お知らせ読み込み
========================= */
async function loadAnnouncements() {

  const container =
    document.getElementById("announcements");

  if (!container) return;

  try {

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

          ${isCoach ? `<button onclick="deleteAnnouncement('${id}')">削除</button>` : ""}

          <hr>
        </div>
      `;
    });

    if (html === "") {
      html = "<p>まだお知らせはありません</p>";
    }

    container.innerHTML = html;

  } catch (error) {

    console.error(error);

    container.innerHTML =
      "お知らせの取得に失敗しました";
  }
}

/* =========================
   投稿（コーチのみ）
========================= */
async function postAnnouncement() {

  if (!isCoach) {
    alert("コーチのみ投稿できます");
    return;
  }

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

    console.error(error);

    document.getElementById("message")
      .innerText = "投稿失敗";
  }
}

/* =========================
   削除（コーチのみ）
========================= */
window.deleteAnnouncement = async function(id) {

  if (!isCoach) {
    alert("コーチのみ削除できます");
    return;
  }

  if (!confirm("削除しますか？")) return;

  try {

    await deleteDoc(doc(db, "announcements", id));

    alert("削除しました");

    location.reload();

  } catch (error) {

    console.error(error);

    alert("削除失敗");
  }
};

/* =========================
   初期化
========================= */
document.addEventListener("DOMContentLoaded", () => {

  // コーチログインボタン（ページ読み込み時に一度だけ）
  const login = confirm("コーチとしてログインしますか？");

  if (login) {
    coachLogin();
  }

  const btn = document.getElementById("postBtn");

  if (btn) {
    btn.addEventListener("click", postAnnouncement);
  }

  loadAnnouncements();
});
