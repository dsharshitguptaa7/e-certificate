// 🔥 GLOBAL USER (email se identify hoga)
let currentUser = null;


/* =========================
   🔥 Typing Effect
========================= */

const text = "Five Days National Workshop on Fundamentals of Artificial Intelligence and Its Applications with Future Perspectives";

let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing-title").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 70);
  }
}


/* =========================
   🎉 Confetti Effect
========================= */

function launchConfetti() {
  const duration = 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


/* =========================
   🔍 Fetch User (EMAIL BASED)
========================= */

async function fetchUser() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const message = document.getElementById('message');

  if (!name || !email) {
    alert("⚠️ Please enter both Name and Email");
    return;
  }

  message.innerText = "Checking...";
  message.style.color = "black";

  try {
    const res = await fetch('participants.json');

    if (!res.ok) {
      message.innerText = "❌ Data file not found";
      return;
    }

    const data = await res.json();

    const user = data.find(p => p.email.toLowerCase() === email);

    if (user) {
      currentUser = user;

      document.getElementById('card').style.display = 'block';
      document.getElementById('username').innerText =
        `🎉 Welcome ${user.name}`;

      message.innerText = "";  // ✅ clear message

      launchConfetti();

    } else {
      currentUser = null;
      message.innerText = "❌ Email not registered";
      message.style.color = "red";
      document.getElementById('card').style.display = 'none';
    }

  } 
  catch (err) {
  console.error(err);

  // 🔥 agar user mil chuka hai to error show mat karo
  if (!currentUser) {
    message.innerText = "⚠️ Error loading data";
    message.style.color = "orange";
  }
}
}
/* =========================
   📥 Download Certificate
========================= */

function downloadCert() {

  if (!currentUser) {
    alert("Please verify your email first");
    return;
  }

  const filePath = "certificates/" + currentUser.certificateFile;

  const link = document.createElement("a");
  link.href = filePath;
  link.download = currentUser.certificateFile;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


/* =========================
   🔄 Tabs Switching
========================= */

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach(el => {
    el.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tab).classList.add("active");
  event.target.classList.add("active");
}


/* =========================
   🚀 Page Load
========================= */

window.onload = function () {
  typeEffect();
};