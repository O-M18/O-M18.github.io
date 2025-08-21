



const roles = [" Analyst ", " Scientist "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const erasingSpeed = 65;
const delayBetweenRoles = 1500;
const typingText = document.getElementById("typing-text");

function type() {
const currentRole = roles[roleIndex];

if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
} else {
    typingText.textContent = currentRole.substring(0, charIndex++);
}

if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(type, delayBetweenRoles);
} else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
} else {
    setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
}
}

document.addEventListener("DOMContentLoaded", () => {
type();
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.accordion-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const content = document.getElementById(targetId);

      // Toggle current one
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        // Optional: close all others
        document.querySelectorAll('.accordion-content').forEach(el => el.style.display = 'none');
        content.style.display = 'block';
      }
    });
  });
});

