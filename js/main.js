// Interest form.
//
// TODO(chad): Formspree
// 1. Create a form at https://formspree.io
// 2. Paste the form id below (the characters after /f/ in the endpoint).
//    Example: const FORMSPREE_ID = "abcdwxyz";
// 3. Leave this empty to keep the mailto fallback.
const FORMSPREE_ID = "";
const MAILTO = "chadakeith@gmail.com";

const header = document.querySelector(".site-header");
const form = document.getElementById("interest-form");
const statusEl = document.getElementById("form-status");
const noteEl = document.getElementById("form-note");

function onScroll() {
  if (!header) return;
  header.classList.toggle("is-stuck", window.scrollY > 8);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

function fieldValue(name) {
  const el = form.elements.namedItem(name);
  return el && "value" in el ? el.value.trim() : "";
}

function mailtoHref() {
  const lines = [
    fieldValue("name") && `Name: ${fieldValue("name")}`,
    `Email: ${fieldValue("email")}`,
    fieldValue("area") && `Zip or area: ${fieldValue("area")}`,
    fieldValue("comment") && `Comment: ${fieldValue("comment")}`,
  ].filter(Boolean);

  const subject = "Lake Norman Cybercab — interest";
  return `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n\n"))}`;
}

function setStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", Boolean(isError));
}

if (FORMSPREE_ID && noteEl) {
  noteEl.textContent = "Your note is sent to the person who made this page. It is not a booking.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  form.classList.add("was-validated");
  setStatus("", false);

  if (fieldValue("_gotcha")) {
    setStatus("Thanks. Your interest is noted.", false);
    form.reset();
    return;
  }

  const email = fieldValue("email");
  if (!email || !form.elements.namedItem("email").checkValidity()) {
    setStatus("Add a valid email address.", true);
    form.elements.namedItem("email").focus();
    return;
  }

  if (!FORMSPREE_ID) {
    window.location.href = mailtoHref();
    setStatus("Your email app should open with a filled-in message. Send it to finish.", false);
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error("Formspree rejected the note");
    }

    form.reset();
    form.classList.remove("was-validated");
    setStatus("Thank you. Your interest was sent.", false);
  } catch (error) {
    window.location.href = mailtoHref();
    setStatus("The form service did not respond, so your email app should open instead. Send that message to finish.", true);
  } finally {
    submitButton.disabled = false;
  }
});
