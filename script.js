let currentUser = null;

/* 🔥 Typing Effect */
const text = "Five Days National Workshop on Artificial Intelligence and It’s Applications with Future Perspectives";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing-title").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}

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

window.onload = typeEffect;


/* 🔥 Certificate Logic */
async function fetchUser() {
  const email = document.getElementById('email').value.trim().toLowerCase();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message');

  if (!email) {
    message.innerText = "⚠️ Please enter email";
    return;
  }

  message.innerText = "User not found";

  try {
    const res = await fetch('participants.json');
    const data = await res.json();

    const user = data.find(p =>
      p.email.trim().toLowerCase() === email
    );

    if (user) {
  currentUser = user;

  document.getElementById('username').innerText =
    `🎉 Welcome ${user.name}`;

  document.getElementById('card').style.display = 'block';
  message.innerText = "✅ Certificate Found!";

  launchConfetti();   // 🔥 ADD THIS LINE
}
  } catch (err) {
    message.innerText = "⚠️ Error loading data";
  }
}

function downloadCert() {
  if (currentUser) {
    window.open(`certificates/${currentUser.certificateFile}`, '_blank');
  }
}