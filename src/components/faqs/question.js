function toggleAnswer(button) {
  const p = button.nextElementSibling;
  const icon = button.querySelector("img");

  if (p && icon) {
    p.classList.toggle("faq-item__answer--open");
    icon.classList.toggle("icon--open");
  }
}
