alert("app.js 読み込み成功");
import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadAnnouncements() {

  const container =
    document.getElementById("announcements");

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

    container.innerHTML = html;

  } catch (error) {

    console.error(error);

    container.innerHTML =
      "お知らせの取得に失敗しました";
  }
}

loadAnnouncements);

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

