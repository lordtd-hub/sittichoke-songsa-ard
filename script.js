const header = document.querySelector("[data-elevate]");
const langToggle = document.querySelector("[data-lang-toggle]");
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const elevateHeader = () => {
  header?.classList.toggle("is-elevated", window.scrollY > 10);
};

const copyByLang = {
  th: {
    title: "สิทธิโชค ทรงสอาด | Sittichoke Songsa-ard",
    description:
      "Academic Portfolio ของ ผศ.ดร.สิทธิโชค ทรงสอาด / Sittichoke Songsa-ard รวมงานวิจัย การสอน งานบริการวิชาการ อบรม AI ค่ายคณิตศาสตร์ และระบบสื่อการเรียนรู้ในสุราษฎร์ธานีและภาคใต้",
    toggleLabel: "สลับภาษาเป็นอังกฤษ"
  },
  en: {
    title: "Sittichoke Songsa-ard | Academic Portfolio",
    description:
      "Academic portfolio of Asst. Prof. Dr. Sittichoke Songsa-ard, featuring research, teaching, AI workshops, mathematics camps, academic service, and learning-system work in Surat Thani and Southern Thailand.",
    toggleLabel: "Switch language to Thai"
  }
};

const applyLanguage = (lang) => {
  const nextLang = lang === "en" ? "en" : "th";
  const copy = copyByLang[nextLang];

  document.body.dataset.lang = nextLang;
  document.documentElement.lang = nextLang;
  document.title = copy.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);

  if (langToggle) {
    langToggle.setAttribute("aria-label", copy.toggleLabel);
    langToggle.setAttribute("aria-pressed", String(nextLang === "en"));
  }

  localStorage.setItem("portfolio-language", nextLang);
  setActiveNav();
};

const setActiveNav = () => {
  const offset = window.innerHeight * 0.32;
  let currentId = sections[0]?.id;
  const profileSection = document.querySelector("#profile");
  const contactSection = document.querySelector("#sources");

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= offset) {
      currentId = section.id;
    }
  }

  if (
    profileSection &&
    contactSection &&
    profileSection.getBoundingClientRect().top <= offset &&
    contactSection.getBoundingClientRect().top > offset
  ) {
    currentId = null;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
  });
};

elevateHeader();
setActiveNav();
applyLanguage(localStorage.getItem("portfolio-language") || document.body.dataset.lang || "th");

window.addEventListener("scroll", () => {
  elevateHeader();
  setActiveNav();
}, { passive: true });

langToggle?.addEventListener("click", () => {
  const useEnglish = document.body.dataset.lang !== "en";
  applyLanguage(useEnglish ? "en" : "th");
});
