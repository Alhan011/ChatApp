const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "chatapp-b0f1c.firebaseapp.com",
  databaseURL: "https://chatapp-b0f1c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-b0f1c",
  storageBucket: "chatapp-b0f1c.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (username === "" || message === "") return;

  db.ref("messages").push({
    sender: username,
    text: message,
    timestamp: Date.now()
  });

  document.getElementById("message").value = "";
}

function displayMessage(data) {
  const chatBox = document.getElementById("chat-box");
  const msg = data.val();

  const div = document.createElement("div");
  div.className = "message";

  div.innerHTML = `<div class="sender">${msg.sender}</div>${msg.text}`;
  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}

db.ref("messages").on("child_added", displayMessage);
