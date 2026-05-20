// Smooth reveal animations
const revealElements = document.querySelectorAll(
  ".event-card, .invitation-container, .gallery-item, .rsvp-container"
);

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  element.classList.add("hidden");
  revealOnScroll.observe(element);
});

// Countdown to the event
const eventDate = new Date("July 18, 2026 19:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  const countdown = document.querySelector("#countdown");

  if (countdown) {
    countdown.innerHTML = `
      <div><strong>${days}</strong><span>Days</span></div>
      <div><strong>${hours}</strong><span>Hours</span></div>
      <div><strong>${minutes}</strong><span>Minutes</span></div>
      <div><strong>${seconds}</strong><span>Seconds</span></div>
    `;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Button click glow effect
const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked");

    setTimeout(() => {
      button.classList.remove("clicked");
    }, 300);
  });
});