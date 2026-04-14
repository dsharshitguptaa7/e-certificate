let currentUser = null;

/* 🔥 Typing Effect */
const text = "Five Days National Workshop on Fundamentals of Artificial Intelligence and Its Applications with Future Perspectives";

let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing-title").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 70); // speed control
  }
}

// page load pe run
window.onload = typeEffect;

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
  const message = document.getElementById('message');

  message.innerText = "Checking...";

  try {
    const res = await fetch('participants.json');

    if (!res.ok) {
      throw new Error("File not found");
    }

    const data = await res.json();

    const user = data.find(p =>
      p.email.toLowerCase() === email
    );

    if (user) {
      document.getElementById('card').style.display = 'block';
      document.getElementById('username').innerText =
        `🎉 Welcome ${user.name}`;

      message.innerText = "";  // ✅ error remove
    } else {
      message.innerText = "❌ Not registered";
    }

  } catch (err) {
    console.error(err);
    message.innerText = "⚠️ Error loading data";
  }

}

function downloadCert() {
  if (currentUser) {
    window.open(`certificates/${currentUser.certificateFile}`, '_blank');
  }
}