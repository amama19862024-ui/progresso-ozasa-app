import { db } from "./firebase.js";

import { 
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// お知らせ一覧取得
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

      html += `
        <div>
          <h3>${data.title}</h3>
          <p>${data.content}</p>
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

// 投稿処理
window.postAnnouncement = async function () {

  const titleInput =
    document.getElementById("title");

  const contentInput =
    document.getElementById("content");

  if (!titleInput || !contentInput) {
    return;
  }

  const title = titleInput.value;
  const content = contentInput.value;

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
        createdAt: Date.now()
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
};

loadAnnouncements();

document
  .getElementById("postBtn")
  .addEventListener("click", window.postAnnouncement);

document
  .getElementById("postBtn")
  .addEventListener("click", () => {
    alert("ボタン押された！");
  });

alert("app.jsの最後まで実行された");
