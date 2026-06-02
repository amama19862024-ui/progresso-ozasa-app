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

loadAnnouncements();
