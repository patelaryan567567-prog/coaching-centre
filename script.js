const STORAGE_KEY = "brightpath_reviews";
const WHATSAPP_NUMBER = "919876543210";

const body = document.body;
const navbar = document.querySelector(".navbar");
const hamburger = document.getElementById("hamburger");
const navDropdown = document.getElementById("navDropdown");
const navOverlay = document.getElementById("navOverlay");
const dropdownClose = document.getElementById("dropdownClose");
const darkToggle = document.getElementById("darkToggle");
const backToTop = document.getElementById("backToTop");
const coursePage = document.getElementById("coursePage");
const cpBody = document.getElementById("cpBody");
const cpBack = document.getElementById("cpBack");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const reviewModal = document.getElementById("reviewModal");
const openReviewModalButton = document.getElementById("openReviewModal");
const closeReviewModalButton = document.getElementById("closeReviewModal");
const reviewForm = document.getElementById("reviewForm");
const userReviewsContainer = document.getElementById("userReviewsContainer");
const calculateFeeButton = document.getElementById("calculateFeeButton");

let selectedRating = 5;
let lastFocusedElement = null;

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function setStoredTheme(value) {
  try {
    localStorage.setItem("theme", value);
  } catch {
    // Ignore storage failures in private mode or restricted browsers.
  }
}

function getReviews() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Ignore storage failures so the UI remains usable.
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark-mode", isDark);
  darkToggle.setAttribute("aria-pressed", String(isDark));
  darkToggle.innerHTML = isDark
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>';
}

function initializeTheme() {
  const storedTheme = getStoredTheme();
  const preferredTheme =
    storedTheme ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  applyTheme(preferredTheme);
}

function openMenu() {
  navDropdown.classList.add("open");
  navDropdown.setAttribute("aria-hidden", "false");
  navOverlay.hidden = false;
  navOverlay.classList.add("show");
  hamburger.setAttribute("aria-expanded", "true");
  body.classList.add("menu-open");
}

function closeMenu() {
  navDropdown.classList.remove("open");
  navDropdown.setAttribute("aria-hidden", "true");
  navOverlay.classList.remove("show");
  navOverlay.hidden = true;
  hamburger.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function updateScrollUI() {
  const isScrolled = window.scrollY > 10;
  const showBackToTop = window.scrollY > 400;

  backToTop.classList.toggle("show", showBackToTop);
  backToTop.setAttribute("aria-hidden", String(!showBackToTop));
  navbar.style.boxShadow = isScrolled
    ? "0 12px 30px rgba(8, 47, 73, 0.14)"
    : "0 8px 20px rgba(8, 47, 73, 0.08)";
}

function setActiveTopperTab(category, activeButton) {
  document.querySelectorAll("[data-topper-filter]").forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  document.querySelectorAll(".topper-card").forEach((card) => {
    const shouldHide = category !== "all" && card.dataset.cat !== category;
    card.classList.toggle("hidden", shouldHide);
  });
}

function toggleFaq(button) {
  const answerId = button.getAttribute("aria-controls");
  const answer = document.getElementById(answerId);
  const shouldOpen = button.getAttribute("aria-expanded") !== "true";

  document.querySelectorAll("[data-faq-trigger]").forEach((item) => {
    item.classList.remove("open");
    item.setAttribute("aria-expanded", "false");
  });

  document.querySelectorAll(".faq-a").forEach((panel) => {
    panel.classList.remove("open");
  });

  if (shouldOpen) {
    button.classList.add("open");
    button.setAttribute("aria-expanded", "true");
    answer.classList.add("open");
  }
}

const feeData = {
  jee: {
    name: "JEE Preparation",
    monthly: 8500,
    "1yr": 90000,
    "2yr": 160000,
    monthly_full: 102000,
    "1yr_full": 102000,
    "2yr_full": 204000,
  },
  neet: {
    name: "NEET Preparation",
    monthly: 7500,
    "1yr": 80000,
    "2yr": 145000,
    monthly_full: 90000,
    "1yr_full": 90000,
    "2yr_full": 180000,
  },
  foundation: {
    name: "Class 6-10 Foundation",
    monthly: 3500,
    "1yr": 38000,
    "2yr": null,
    monthly_full: 42000,
    "1yr_full": 42000,
    "2yr_full": null,
  },
  upsc: {
    name: "UPSC Civil Services",
    monthly: 12000,
    "1yr": 130000,
    "2yr": 240000,
    monthly_full: 144000,
    "1yr_full": 144000,
    "2yr_full": 288000,
  },
};

function calculateFee() {
  const course = document.getElementById("calcCourse").value;
  const duration = document.getElementById("calcDuration").value;
  const details = feeData[course];
  const fee = details[duration];

  if (!fee) {
    window.alert("This duration is not available for the selected course.");
    return;
  }

  const fullPrice = details[`${duration}_full`] || fee;
  const saving = fullPrice - fee;
  const durationLabel = { monthly: "Monthly", "1yr": "1 Year", "2yr": "2 Years" }[duration];

  document.getElementById("crCourse").textContent = details.name;
  document.getElementById("crDuration").textContent = durationLabel;
  document.getElementById("crFee").textContent = `Rs ${fee.toLocaleString("en-IN")}`;
  document.getElementById("crSave").textContent =
    saving > 0 ? `Save Rs ${saving.toLocaleString("en-IN")}` : "No extra saving";
  document.getElementById("calcResult").classList.add("show");
}

const PICS = {
  rajesh: "https://api.dicebear.com/7.x/adventurer/svg?seed=RajeshKumar&backgroundColor=b6e3f4&hair=short01&eyes=variant01&skinColor=brown",
  priya: "https://api.dicebear.com/7.x/adventurer/svg?seed=PriyaSharma&backgroundColor=ffd5dc&hair=long01&eyes=variant02&skinColor=light",
  amit: "https://api.dicebear.com/7.x/adventurer/svg?seed=AmitVerma&backgroundColor=c0aede&hair=short02&eyes=variant03&skinColor=brown",
  sunita: "https://api.dicebear.com/7.x/adventurer/svg?seed=SunitaRao&backgroundColor=d1f7c4&hair=long02&eyes=variant04&skinColor=light",
  vikram: "https://api.dicebear.com/7.x/adventurer/svg?seed=VikramSingh&backgroundColor=ffeaa7&hair=short03&eyes=variant05&skinColor=brown",
  neha: "https://api.dicebear.com/7.x/adventurer/svg?seed=NehaMehta&backgroundColor=ffd3b6&hair=long03&eyes=variant06&skinColor=light",
  arjun: "https://api.dicebear.com/7.x/adventurer/svg?seed=ArjunMishra&backgroundColor=b0c4de&hair=short04&eyes=variant07&skinColor=brown",
  kavita: "https://api.dicebear.com/7.x/adventurer/svg?seed=KavitaJoshi&backgroundColor=e8f5e9&hair=long04&eyes=variant08&skinColor=light",
  deepak: "https://api.dicebear.com/7.x/adventurer/svg?seed=DeepakPandey&backgroundColor=ffe0b2&hair=short05&eyes=variant09&skinColor=brown",
  rekha: "https://api.dicebear.com/7.x/adventurer/svg?seed=RekhaNair&backgroundColor=e1bee7&hair=long05&eyes=variant10&skinColor=light",
};

const courses = {
  jee: {
    title: "JEE Preparation",
    subtitle: "Physics, Chemistry and Maths for JEE Mains and Advanced",
    banner: "linear-gradient(135deg, #0f4c5c, #1d7874)",
    icon: "fa-atom",
    stats: [
      { icon: "fa-rupee-sign", value: "Rs 8,500/mo", label: "Monthly Fee" },
      { icon: "fa-clock", value: "3/Day", label: "Classes Per Day" },
      { icon: "fa-users", value: "Max 20", label: "Batch Size" },
      { icon: "fa-calendar", value: "Mon-Sat", label: "Schedule" },
    ],
    timings: [
      { label: "Morning Batch", time: "6:30 AM - 9:30 AM", days: "Monday to Saturday" },
      { label: "Evening Batch", time: "5:00 PM - 8:00 PM", days: "Monday to Saturday" },
    ],
    faculty: [
      { name: "Mr. Rajesh Kumar", role: "Physics", qual: "B.Tech IIT Delhi - 12 yrs exp.", desc: "JEE Advanced specialist in Mechanics and Electrostatics. 300+ JEE selections.", pic: "rajesh" },
      { name: "Mrs. Sunita Rao", role: "Chemistry", qual: "M.Sc Chemistry, Pune University - 10 yrs exp.", desc: "Organic and Inorganic Chemistry expert with clear shortcut-driven teaching.", pic: "sunita" },
      { name: "Mr. Amit Verma", role: "Mathematics", qual: "M.Sc Maths, NIT Trichy - 14 yrs exp.", desc: "Calculus, Algebra and Coordinate Geometry specialist with a concept-first approach.", pic: "amit" },
    ],
    includes: [
      "2-year and 1-year programs available",
      "Daily Practice Problem sheets",
      "All India mock tests every month",
      "Chapter-wise test series",
      "Printed study material included",
      "Weekly doubt-clearing sessions",
      "Parent progress reports every month",
      "Previous year JEE paper practice",
    ],
    info: [
      { label: "Duration", value: "1 Year / 2 Years" },
      { label: "Eligibility", value: "Class 11 and 12 / Droppers" },
      { label: "Medium", value: "Hindi and English" },
      { label: "Test Day", value: "Every Sunday" },
      { label: "Doubt Class", value: "Every Wednesday" },
      { label: "Seats Left", value: "8 Seats Available" },
    ],
    pricing: [
      { plan: "Monthly", price: "Rs 8,500", note: "Per month" },
      { plan: "1 Year", price: "Rs 90,000", note: "Save Rs 12,000" },
      { plan: "2 Years", price: "Rs 1,60,000", note: "Best Value" },
    ],
  },
  neet: {
    title: "NEET Preparation",
    subtitle: "Biology, Physics and Chemistry with NCERT-focused strategy",
    banner: "linear-gradient(135deg, #7f1d1d, #b45309)",
    icon: "fa-dna",
    stats: [
      { icon: "fa-rupee-sign", value: "Rs 7,500/mo", label: "Monthly Fee" },
      { icon: "fa-clock", value: "3/Day", label: "Classes Per Day" },
      { icon: "fa-users", value: "Max 18", label: "Batch Size" },
      { icon: "fa-calendar", value: "Mon-Sat", label: "Schedule" },
    ],
    timings: [
      { label: "Morning Batch", time: "7:00 AM - 10:00 AM", days: "Monday to Saturday" },
      { label: "Evening Batch", time: "4:00 PM - 7:00 PM", days: "Monday to Saturday" },
    ],
    faculty: [
      { name: "Mrs. Priya Sharma", role: "Biology", qual: "M.Sc Botany, Gold Medalist - 9 yrs exp.", desc: "NEET Biology expert with a strong NCERT line-by-line approach.", pic: "priya" },
      { name: "Mr. Rajesh Kumar", role: "Physics", qual: "B.Tech IIT Delhi - 12 yrs exp.", desc: "Physics classes that simplify difficult topics with exam-focused practice.", pic: "rajesh" },
      { name: "Mrs. Sunita Rao", role: "Chemistry", qual: "M.Sc Chemistry, Pune University - 10 yrs exp.", desc: "Chemistry specialist known for mnemonics, shortcuts and revision systems.", pic: "sunita" },
      { name: "Mrs. Rekha Nair", role: "Zoology and Botany", qual: "M.Sc Zoology, Kerala University - 9 yrs exp.", desc: "Biology co-faculty focused on diagrams, NCERT MCQs and previous year papers.", pic: "rekha" },
    ],
    includes: [
      "NCERT line-by-line coverage",
      "Chapter-wise tests every week",
      "Biology special doubt sessions",
      "Previous 10-year paper practice",
      "Full-length mock tests every month",
      "Printed notes and diagrams booklet",
      "Online test series access",
      "NCERT Exemplar problem solving",
    ],
    info: [
      { label: "Duration", value: "1 Year / 2 Years" },
      { label: "Eligibility", value: "Class 11 and 12 / Droppers" },
      { label: "Medium", value: "Hindi and English" },
      { label: "Test Day", value: "Every Saturday" },
      { label: "Doubt Class", value: "Every Tuesday" },
      { label: "Seats Left", value: "5 Seats Available" },
    ],
    pricing: [
      { plan: "Monthly", price: "Rs 7,500", note: "Per month" },
      { plan: "1 Year", price: "Rs 80,000", note: "Save Rs 10,000" },
      { plan: "2 Years", price: "Rs 1,45,000", note: "Best Value" },
    ],
  },
  foundation: {
    title: "Class 6-10 Foundation",
    subtitle: "Strong base in Maths and Science for boards and competitive exams",
    banner: "linear-gradient(135deg, #14532d, #2f855a)",
    icon: "fa-calculator",
    stats: [
      { icon: "fa-rupee-sign", value: "Rs 3,500/mo", label: "Monthly Fee" },
      { icon: "fa-clock", value: "2/Day", label: "Classes Per Day" },
      { icon: "fa-users", value: "Max 25", label: "Batch Size" },
      { icon: "fa-calendar", value: "Mon-Fri", label: "Schedule" },
    ],
    timings: [
      { label: "Morning Batch", time: "7:00 AM - 9:00 AM", days: "Monday to Friday" },
      { label: "Evening Batch", time: "5:30 PM - 7:30 PM", days: "Monday to Friday" },
    ],
    faculty: [
      { name: "Mr. Vikram Singh", role: "Science and Maths", qual: "B.Ed, M.Sc Physics - 8 yrs exp.", desc: "Activity-based teaching that makes science and maths approachable for younger learners.", pic: "vikram" },
      { name: "Ms. Neha Mehta", role: "English and SST", qual: "MA English, Delhi University - 7 yrs exp.", desc: "Builds reading, writing and presentation skills that help across board exams.", pic: "neha" },
      { name: "Mr. Amit Verma", role: "Mathematics", qual: "M.Sc Maths, NIT Trichy - 14 yrs exp.", desc: "Concept-first maths teaching with speed techniques for school and olympiad prep.", pic: "amit" },
    ],
    includes: [
      "CBSE and State Board full coverage",
      "Olympiad training",
      "Concept-based learning approach",
      "Weekly class tests",
      "Homework and assignment checking",
      "Monthly parent-teacher meetings",
      "Activity-based science sessions",
      "Mental Maths and speed techniques",
    ],
    info: [
      { label: "Duration", value: "1 Academic Year" },
      { label: "Eligibility", value: "Class 6 to 10" },
      { label: "Medium", value: "Hindi and English" },
      { label: "Test Day", value: "Every Friday" },
      { label: "Doubt Class", value: "Every Thursday" },
      { label: "Seats Left", value: "12 Seats Available" },
    ],
    pricing: [
      { plan: "Monthly", price: "Rs 3,500", note: "Per month" },
      { plan: "Annual", price: "Rs 38,000", note: "Save Rs 4,000" },
    ],
  },
  upsc: {
    title: "UPSC Civil Services",
    subtitle: "Complete IAS and IPS preparation for Prelims, Mains and Interview",
    banner: "linear-gradient(135deg, #7c2d12, #c2410c)",
    icon: "fa-landmark",
    stats: [
      { icon: "fa-rupee-sign", value: "Rs 12,000/mo", label: "Monthly Fee" },
      { icon: "fa-clock", value: "3/Day", label: "Classes Per Day" },
      { icon: "fa-users", value: "Max 15", label: "Batch Size" },
      { icon: "fa-calendar", value: "Mon-Sun", label: "Schedule" },
    ],
    timings: [
      { label: "Morning Batch", time: "6:00 AM - 9:00 AM", days: "Monday to Sunday" },
      { label: "Evening Batch", time: "6:00 PM - 9:00 PM", days: "Monday to Sunday" },
    ],
    faculty: [
      { name: "Mr. Arjun Mishra", role: "GS and Polity", qual: "Ex-IAS Officer (2008 Batch) - 16 yrs exp.", desc: "Mentors Prelims, Mains and interview prep with strong GS structure.", pic: "arjun" },
      { name: "Mrs. Kavita Joshi", role: "History and Geography", qual: "MA History, JNU Delhi - 11 yrs exp.", desc: "Known for crisp answer-writing techniques in Mains-focused classes.", pic: "kavita" },
      { name: "Mr. Deepak Pandey", role: "Economics and CSAT", qual: "MA Economics, BHU Varanasi - 10 yrs exp.", desc: "Handles economy, current affairs and reasoning with strong daily practice habits.", pic: "deepak" },
      { name: "Ms. Neha Mehta", role: "Essay and English", qual: "MA English, Delhi University - 7 yrs exp.", desc: "Supports essay structure, comprehension and written communication for Mains.", pic: "neha" },
    ],
    includes: [
      "Prelims, Mains and Interview prep",
      "GS Paper 1, 2, 3 and 4 coverage",
      "CSAT practice sessions",
      "Current affairs daily discussion",
      "Daily answer-writing practice",
      "Mock interviews by ex-IAS panel",
      "Newspaper analysis",
      "Printed notes, maps and diagrams",
    ],
    info: [
      { label: "Duration", value: "1 Year / 2 Years" },
      { label: "Eligibility", value: "Any Graduate / Final Year" },
      { label: "Medium", value: "Hindi and English" },
      { label: "Test Day", value: "Every Sunday" },
      { label: "Doubt Class", value: "Every Monday" },
      { label: "Seats Left", value: "4 Seats Available" },
    ],
    pricing: [
      { plan: "Monthly", price: "Rs 12,000", note: "Per month" },
      { plan: "1 Year", price: "Rs 1,30,000", note: "Save Rs 14,000" },
      { plan: "2 Years", price: "Rs 2,40,000", note: "Best Value" },
    ],
  },
};

function openCourse(id) {
  const course = courses[id];

  cpBody.innerHTML = `
    <div class="cp-hero" style="background:${course.banner}">
      <i class="fas ${course.icon}" aria-hidden="true"></i>
      <h1>${course.title}</h1>
      <p>${course.subtitle}</p>
    </div>
    <div class="cp-content">
      <div class="cp-stats">
        ${course.stats
          .map(
            (item) => `
              <div class="cp-stat">
                <i class="fas ${item.icon}" aria-hidden="true"></i>
                <strong>${item.value}</strong>
                <span>${item.label}</span>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-clock" aria-hidden="true"></i> Batch Timings</div>
        <div class="cp-timings">
          ${course.timings
            .map(
              (timing) => `
                <div class="cp-timing-card">
                  <h4>${timing.label}</h4>
                  <p>${timing.time}</p>
                  <p>${timing.days}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-chalkboard-teacher" aria-hidden="true"></i> Faculty</div>
        <div class="cp-faculty-grid">
          ${course.faculty
            .map(
              (member) => `
                <div class="cp-faculty-card">
                  <img src="${PICS[member.pic]}" alt="${member.name}" />
                  <div>
                    <strong>${member.name}</strong>
                    <em>${member.role}</em>
                    <span class="cp-fac-qual">${member.qual}</span>
                    <p class="cp-fac-desc">${member.desc}</p>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-list-check" aria-hidden="true"></i> What's Included</div>
        <ul class="cp-includes">
          ${course.includes.map((item) => `<li><i class="fas fa-check" aria-hidden="true"></i>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-info-circle" aria-hidden="true"></i> Course Info</div>
        <div class="cp-info-grid">
          ${course.info
            .map(
              (item) => `
                <div class="cp-info-item">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-tag" aria-hidden="true"></i> Fee Structure</div>
        <div class="cp-pricing">
          ${course.pricing
            .map(
              (price) => `
                <div class="cp-price-card">
                  <span>${price.plan}</span>
                  <strong>${price.price}</strong>
                  <em>${price.note}</em>
                </div>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="cp-cta">
        <p>Interested in this course? Book a free demo class today.</p>
        <a href="#contact" class="btn-primary course-contact-link">Enquire Now <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  `;

  cpBody.querySelector(".course-contact-link")?.addEventListener("click", closeCourse);
  enhanceRemoteImages(cpBody.querySelectorAll("img"));
  coursePage.classList.add("open");
  coursePage.setAttribute("aria-hidden", "false");
  body.classList.add("course-open");
  coursePage.scrollTop = 0;
}

function closeCourse() {
  coursePage.classList.remove("open");
  coursePage.setAttribute("aria-hidden", "true");
  body.classList.remove("course-open");
}

function openReviewModal() {
  lastFocusedElement = document.activeElement;
  reviewModal.classList.add("active");
  reviewModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  document.getElementById("reviewName").focus();
}

function closeReviewModal() {
  reviewModal.classList.remove("active");
  reviewModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function updateStars(value) {
  document.querySelectorAll(".star-btn").forEach((button) => {
    const buttonValue = Number(button.dataset.val);
    const isActive = buttonValue <= value;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(buttonValue === value));
  });
}

function createStarsElement(rating) {
  const stars = document.createElement("div");
  stars.className = "stars";
  stars.setAttribute("aria-label", `${rating} out of 5 stars`);
  stars.textContent = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
  return stars;
}

function reportReview(index) {
  const reviews = getReviews();
  const review = reviews[index];

  if (!review) {
    return;
  }

  const confirmed = window.confirm("Report this review for follow-up? It will be hidden from the page.");
  if (!confirmed) {
    return;
  }

  reviews[index] = { ...review, flagged: true };
  saveReviews(reviews);
  renderReviews();
}

function renderReviews() {
  userReviewsContainer.innerHTML = "";

  getReviews().forEach((review, index) => {
    if (review.flagged) {
      return;
    }

      const card = document.createElement("div");
      card.className = "testimonial-card";

      const reportButton = document.createElement("button");
      reportButton.className = "report-btn";
      reportButton.type = "button";
      reportButton.innerHTML = '<i class="fas fa-flag" aria-hidden="true"></i> Report';
      reportButton.addEventListener("click", () => reportReview(index));

      const quote = document.createElement("p");
      quote.textContent = `"${review.text}"`;

      const student = document.createElement("div");
      student.className = "student";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = review.name.charAt(0).toUpperCase();

      const meta = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = review.name;
      const role = document.createElement("span");
      role.textContent = review.role;

      meta.append(name, role);
      student.append(avatar, meta);
      card.append(reportButton, createStarsElement(review.rating), quote, student);
      userReviewsContainer.appendChild(card);
    });
}

function buildWhatsAppMessage(formData) {
  const lines = [
    "Hello BrightPath, I would like to enquire about a course.",
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Course: ${formData.course}`,
  ];

  if (formData.email) {
    lines.push(`Email: ${formData.email}`);
  }

  if (formData.message) {
    lines.push(`Message: ${formData.message}`);
  }

  return lines.join("\n");
}

function validateContactForm(formData) {
  const phoneOk = /^\d{10}$/.test(formData.phone);
  const emailOk = !formData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  if (!phoneOk) {
    window.alert("Please enter a valid 10-digit phone number.");
    return false;
  }

  if (!emailOk) {
    window.alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

function handleContactSubmit(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("contactName").value.trim(),
    phone: document.getElementById("contactPhone").value.trim(),
    email: document.getElementById("contactEmail").value.trim(),
    course: document.getElementById("contactCourse").value.trim(),
    message: document.getElementById("contactMessage").value.trim(),
  };

  if (!validateContactForm(formData)) {
    return;
  }

  const message = buildWhatsAppMessage(formData);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  formSuccess.style.display = "block";
  window.open(url, "_blank", "noopener,noreferrer");
  contactForm.reset();

  window.setTimeout(() => {
    formSuccess.style.display = "none";
  }, 5000);
}

function createFallbackAvatar(name) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="24" fill="#dbeafe" />
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#0f4c5c">${initials || "BP"}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function enhanceRemoteImages(scope = document.querySelectorAll('img[src^="http"]')) {
  scope.forEach((image) => {
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    image.addEventListener(
      "error",
      () => {
        image.src = createFallbackAvatar(image.alt || "BrightPath");
      },
      { once: true }
    );
  });
}

function handleEscape(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (reviewModal.classList.contains("active")) {
    closeReviewModal();
    return;
  }

  if (coursePage.classList.contains("open")) {
    closeCourse();
    return;
  }

  if (navDropdown.classList.contains("open")) {
    closeMenu();
  }
}

function initializeEventListeners() {
  hamburger.addEventListener("click", openMenu);
  dropdownClose.addEventListener("click", closeMenu);
  navOverlay.addEventListener("click", closeMenu);
  darkToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });

  document.querySelectorAll("[data-menu-link]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll("[data-course-trigger]").forEach((button) => {
    button.addEventListener("click", () => openCourse(button.dataset.courseTrigger));
  });

  document.querySelectorAll("[data-topper-filter]").forEach((button) => {
    button.addEventListener("click", () => setActiveTopperTab(button.dataset.topperFilter, button));
  });

  document.querySelectorAll("[data-faq-trigger]").forEach((button) => {
    button.addEventListener("click", () => toggleFaq(button));
  });

  calculateFeeButton.addEventListener("click", calculateFee);
  cpBack.addEventListener("click", closeCourse);
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  contactForm.addEventListener("submit", handleContactSubmit);
  openReviewModalButton.addEventListener("click", openReviewModal);
  closeReviewModalButton.addEventListener("click", closeReviewModal);
  reviewModal.addEventListener("click", (event) => {
    if (event.target === reviewModal) {
      closeReviewModal();
    }
  });

  document.querySelectorAll(".star-btn").forEach((button) => {
    button.addEventListener("mouseenter", () => updateStars(Number(button.dataset.val)));
    button.addEventListener("mouseleave", () => updateStars(selectedRating));
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.val);
      updateStars(selectedRating);
    });
  });

  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const role = document.getElementById("reviewRole").value.trim();
    const text = document.getElementById("reviewText").value.trim();

    if (!name || !role || !text) {
      return;
    }

    const reviews = getReviews();
    reviews.unshift({ name, role, text, rating: selectedRating, flagged: false });
    saveReviews(reviews);
    renderReviews();

    reviewForm.reset();
    selectedRating = 5;
    updateStars(selectedRating);
    closeReviewModal();
  });

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  document.addEventListener("keydown", handleEscape);
}

initializeTheme();
initializeEventListeners();
updateScrollUI();
updateStars(selectedRating);
enhanceRemoteImages();
renderReviews();
