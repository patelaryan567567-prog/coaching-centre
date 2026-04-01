// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

// ── COURSE DATA ──
// Cartoon pics: DiceBear adventurer style — clean illustrated faces
// Male teachers: seed with name, female: seed with name + flip
const PICS = {
  rajesh:  'https://api.dicebear.com/7.x/adventurer/svg?seed=RajeshKumar&backgroundColor=b6e3f4&hair=short01&eyes=variant01&skinColor=brown',
  priya:   'https://api.dicebear.com/7.x/adventurer/svg?seed=PriyaSharma&backgroundColor=ffd5dc&hair=long01&eyes=variant02&skinColor=light',
  amit:    'https://api.dicebear.com/7.x/adventurer/svg?seed=AmitVerma&backgroundColor=c0aede&hair=short02&eyes=variant03&skinColor=brown',
  sunita:  'https://api.dicebear.com/7.x/adventurer/svg?seed=SunitaRao&backgroundColor=d1f7c4&hair=long02&eyes=variant04&skinColor=light',
  vikram:  'https://api.dicebear.com/7.x/adventurer/svg?seed=VikramSingh&backgroundColor=ffeaa7&hair=short03&eyes=variant05&skinColor=brown',
  neha:    'https://api.dicebear.com/7.x/adventurer/svg?seed=NehaMehta&backgroundColor=ffd3b6&hair=long03&eyes=variant06&skinColor=light',
  arjun:   'https://api.dicebear.com/7.x/adventurer/svg?seed=ArjunMishra&backgroundColor=b0c4de&hair=short04&eyes=variant07&skinColor=brown',
  kavita:  'https://api.dicebear.com/7.x/adventurer/svg?seed=KavitaJoshi&backgroundColor=e8f5e9&hair=long04&eyes=variant08&skinColor=light',
  deepak:  'https://api.dicebear.com/7.x/adventurer/svg?seed=DeepakPandey&backgroundColor=ffe0b2&hair=short05&eyes=variant09&skinColor=brown',
  rekha:   'https://api.dicebear.com/7.x/adventurer/svg?seed=RekhaNair&backgroundColor=e1bee7&hair=long05&eyes=variant10&skinColor=light',
};

const courses = {
  jee: {
    title: 'JEE Preparation',
    subtitle: 'Physics, Chemistry & Maths for JEE Mains & Advanced',
    banner: 'linear-gradient(135deg,#1e3a5f,#2e6da4)',
    icon: 'fa-atom',
    stats: [
      { icon: 'fa-rupee-sign', value: '\u20b98,500/mo', label: 'Monthly Fee' },
      { icon: 'fa-clock',      value: '3/Day',         label: 'Classes Per Day' },
      { icon: 'fa-users',      value: 'Max 20',        label: 'Batch Size' },
      { icon: 'fa-calendar',   value: 'Mon\u2013Sat',  label: 'Schedule' },
    ],
    timings: [
      { label: 'Morning Batch', time: '6:30 AM \u2013 9:30 AM', days: 'Monday to Saturday' },
      { label: 'Evening Batch', time: '5:00 PM \u2013 8:00 PM', days: 'Monday to Saturday' },
    ],
    faculty: [
      { name: 'Mr. Rajesh Kumar',  role: 'Physics',   qual: 'B.Tech IIT Delhi — 12 yrs exp.', desc: 'JEE Advanced specialist in Mechanics & Electrostatics. 300+ JEE selections. Known for making complex topics simple with real-life examples.', pic: 'rajesh' },
      { name: 'Mrs. Sunita Rao',   role: 'Chemistry', qual: 'M.Sc Chemistry, Pune Univ. — 10 yrs exp.', desc: 'Organic & Inorganic Chemistry expert. Famous for shortcut tricks in reactions. 150+ JEE & NEET selections.', pic: 'sunita' },
      { name: 'Mr. Amit Verma',    role: 'Mathematics', qual: 'M.Sc Maths, NIT Trichy — 14 yrs exp.', desc: 'Calculus, Algebra & Coordinate Geometry specialist. 95% of his students score 90+ in boards. Concept-first approach.', pic: 'amit' },
    ],
    includes: [
      '2-year & 1-year programs available',
      'Daily Practice Problem (DPP) sheets',
      'All India Mock Tests (monthly)',
      'Chapter-wise test series',
      'Printed study material included',
      'Weekly doubt-clearing sessions',
      'Parent progress report (monthly)',
      'Previous year JEE paper practice',
    ],
    info: [
      { label: 'Duration',    value: '1 Year / 2 Years' },
      { label: 'Eligibility', value: 'Class 11 & 12 / Droppers' },
      { label: 'Medium',      value: 'Hindi & English' },
      { label: 'Test Day',    value: 'Every Sunday' },
      { label: 'Doubt Class', value: 'Every Wednesday' },
      { label: 'Seats Left',  value: '8 Seats Available' },
    ],
    pricing: [
      { plan: 'Monthly',  price: '\u20b98,500',    note: 'Per month' },
      { plan: '1 Year',   price: '\u20b990,000',   note: 'Save \u20b912,000' },
      { plan: '2 Years',  price: '\u20b91,60,000', note: 'Best Value' },
    ],
  },
  neet: {
    title: 'NEET Preparation',
    subtitle: 'Biology, Physics & Chemistry with NCERT-focused strategy',
    banner: 'linear-gradient(135deg,#7b2d8b,#c0392b)',
    icon: 'fa-dna',
    stats: [
      { icon: 'fa-rupee-sign', value: '\u20b97,500/mo', label: 'Monthly Fee' },
      { icon: 'fa-clock',      value: '3/Day',         label: 'Classes Per Day' },
      { icon: 'fa-users',      value: 'Max 18',        label: 'Batch Size' },
      { icon: 'fa-calendar',   value: 'Mon\u2013Sat',  label: 'Schedule' },
    ],
    timings: [
      { label: 'Morning Batch', time: '7:00 AM \u2013 10:00 AM', days: 'Monday to Saturday' },
      { label: 'Evening Batch', time: '4:00 PM \u2013 7:00 PM',  days: 'Monday to Saturday' },
    ],
    faculty: [
      { name: 'Mrs. Priya Sharma', role: 'Biology',          qual: 'M.Sc Botany, Gold Medalist — 9 yrs exp.', desc: 'NEET Biology expert with 200+ selections. NCERT line-by-line approach. Diagrams & flowcharts make her classes unforgettable.', pic: 'priya' },
      { name: 'Mr. Rajesh Kumar',  role: 'Physics',          qual: 'B.Tech IIT Delhi — 12 yrs exp.', desc: 'JEE Advanced specialist in Mechanics & Electrostatics. 300+ JEE selections. Known for making complex topics simple.', pic: 'rajesh' },
      { name: 'Mrs. Sunita Rao',   role: 'Chemistry',        qual: 'M.Sc Chemistry, Pune Univ. — 10 yrs exp.', desc: 'Organic & Inorganic Chemistry expert for JEE & NEET. Famous for shortcut tricks and mnemonics.', pic: 'sunita' },
      { name: 'Mrs. Rekha Nair',   role: 'Zoology & Botany', qual: 'M.Sc Zoology, Kerala Univ. — 9 yrs exp.', desc: 'NEET Biology co-faculty. Diagrams, NCERT MCQs & previous year paper specialist. 180+ NEET selections.', pic: 'rekha' },
    ],
    includes: [
      'NCERT line-by-line coverage',
      'Chapter-wise tests every week',
      'Biology special doubt sessions',
      'Previous 10-year paper practice',
      'Full-length mock tests (monthly)',
      'Printed notes + diagrams booklet',
      'Online test series access',
      'NCERT Exemplar problem solving',
    ],
    info: [
      { label: 'Duration',    value: '1 Year / 2 Years' },
      { label: 'Eligibility', value: 'Class 11 & 12 / Droppers' },
      { label: 'Medium',      value: 'Hindi & English' },
      { label: 'Test Day',    value: 'Every Saturday' },
      { label: 'Doubt Class', value: 'Every Tuesday' },
      { label: 'Seats Left',  value: '5 Seats Available' },
    ],
    pricing: [
      { plan: 'Monthly',  price: '\u20b97,500',    note: 'Per month' },
      { plan: '1 Year',   price: '\u20b980,000',   note: 'Save \u20b910,000' },
      { plan: '2 Years',  price: '\u20b91,45,000', note: 'Best Value' },
    ],
  },
  foundation: {
    title: 'Class 6\u201310 Foundation',
    subtitle: 'Strong base in Maths & Science for boards and competitive exams',
    banner: 'linear-gradient(135deg,#145a32,#1e8449)',
    icon: 'fa-calculator',
    stats: [
      { icon: 'fa-rupee-sign', value: '\u20b93,500/mo', label: 'Monthly Fee' },
      { icon: 'fa-clock',      value: '2/Day',         label: 'Classes Per Day' },
      { icon: 'fa-users',      value: 'Max 25',        label: 'Batch Size' },
      { icon: 'fa-calendar',   value: 'Mon\u2013Fri',  label: 'Schedule' },
    ],
    timings: [
      { label: 'Morning Batch', time: '7:00 AM \u2013 9:00 AM',  days: 'Monday to Friday' },
      { label: 'Evening Batch', time: '5:30 PM \u2013 7:30 PM',  days: 'Monday to Friday' },
    ],
    faculty: [
      { name: 'Mr. Vikram Singh', role: 'Science & Maths', qual: 'B.Ed, M.Sc Physics — 8 yrs exp.', desc: 'Foundation batch specialist for Class 6–10. Activity-based learning approach. Makes science fun with real-life experiments.', pic: 'vikram' },
      { name: 'Ms. Neha Mehta',   role: 'English & SST',   qual: 'MA English, Delhi Univ. — 7 yrs exp.', desc: 'Essay writing, grammar & Social Studies expert. Helps students build strong reading and writing habits for boards.', pic: 'neha' },
      { name: 'Mr. Amit Verma',   role: 'Mathematics',     qual: 'M.Sc Maths, NIT Trichy — 14 yrs exp.', desc: 'Calculus, Algebra & Geometry specialist. Mental Maths & speed techniques for competitive exams.', pic: 'amit' },
    ],
    includes: [
      'CBSE & State Board full coverage',
      'Olympiad training (NSO, IMO, NTSE)',
      'Concept-based learning approach',
      'Weekly class tests',
      'Homework & assignment checking',
      'Monthly parent-teacher meeting',
      'Activity-based science sessions',
      'Mental Maths & speed techniques',
    ],
    info: [
      { label: 'Duration',    value: '1 Academic Year' },
      { label: 'Eligibility', value: 'Class 6 to 10' },
      { label: 'Medium',      value: 'Hindi & English' },
      { label: 'Test Day',    value: 'Every Friday' },
      { label: 'Doubt Class', value: 'Every Thursday' },
      { label: 'Seats Left',  value: '12 Seats Available' },
    ],
    pricing: [
      { plan: 'Monthly',  price: '\u20b93,500',  note: 'Per month' },
      { plan: 'Annual',   price: '\u20b938,000', note: 'Save \u20b94,000' },
    ],
  },
  upsc: {
    title: 'UPSC Civil Services',
    subtitle: 'Complete IAS/IPS preparation — Prelims, Mains & Interview',
    banner: 'linear-gradient(135deg,#7d6608,#d4ac0d)',
    icon: 'fa-landmark',
    stats: [
      { icon: 'fa-rupee-sign', value: '\u20b912,000/mo', label: 'Monthly Fee' },
      { icon: 'fa-clock',      value: '3/Day',           label: 'Classes Per Day' },
      { icon: 'fa-users',      value: 'Max 15',          label: 'Batch Size' },
      { icon: 'fa-calendar',   value: 'Mon\u2013Sun',    label: 'Schedule' },
    ],
    timings: [
      { label: 'Morning Batch', time: '6:00 AM \u2013 9:00 AM', days: 'Monday to Sunday' },
      { label: 'Evening Batch', time: '6:00 PM \u2013 9:00 PM', days: 'Monday to Sunday' },
    ],
    faculty: [
      { name: 'Mr. Arjun Mishra',  role: 'GS & Polity',        qual: 'Ex-IAS Officer (2008 Batch) — 16 yrs exp.', desc: 'Indian Polity, Governance & General Studies for UPSC Prelims & Mains. Mock interview panelist. 80+ IAS/IPS selections.', pic: 'arjun' },
      { name: 'Mrs. Kavita Joshi', role: 'History & Geography', qual: 'MA History, JNU Delhi — 11 yrs exp.', desc: 'Modern Indian History, World Geography & Environment for UPSC Mains. Known for crisp answer-writing techniques.', pic: 'kavita' },
      { name: 'Mr. Deepak Pandey', role: 'Economics & CSAT',    qual: 'MA Economics, BHU Varanasi — 10 yrs exp.', desc: 'Indian Economy, Budget analysis & CSAT Reasoning. Current Affairs daily sessions with newspaper analysis.', pic: 'deepak' },
      { name: 'Ms. Neha Mehta',    role: 'Essay & English',     qual: 'MA English, Delhi Univ. — 7 yrs exp.', desc: 'Essay writing, precis & English comprehension for UPSC Mains. Structured approach to GS answer writing.', pic: 'neha' },
    ],
    includes: [
      'Prelims + Mains + Interview prep',
      'GS Paper 1, 2, 3, 4 full coverage',
      'CSAT practice sessions',
      'Current Affairs daily discussion',
      'Answer writing practice (daily)',
      'Mock interviews by ex-IAS panel',
      'Newspaper analysis (The Hindu / IE)',
      'Printed notes + maps + diagrams',
    ],
    info: [
      { label: 'Duration',    value: '1 Year / 2 Years' },
      { label: 'Eligibility', value: 'Any Graduate / Final Year' },
      { label: 'Medium',      value: 'Hindi & English' },
      { label: 'Test Day',    value: 'Every Sunday' },
      { label: 'Doubt Class', value: 'Every Monday' },
      { label: 'Seats Left',  value: '4 Seats Available' },
    ],
    pricing: [
      { plan: 'Monthly',  price: '\u20b912,000',   note: 'Per month' },
      { plan: '1 Year',   price: '\u20b91,30,000', note: 'Save \u20b914,000' },
      { plan: '2 Years',  price: '\u20b92,40,000', note: 'Best Value' },
    ],
  },
};

function openCourse(id) {
  const c = courses[id];
  const page = document.getElementById('coursePage');

  document.getElementById('cpBody').innerHTML = `
    <div class="cp-hero" style="background:${c.banner}">
      <i class="fas ${c.icon}"></i>
      <h1>${c.title}</h1>
      <p>${c.subtitle}</p>
    </div>
    <div class="cp-content">

      <div class="cp-stats">
        ${c.stats.map(s => `
          <div class="cp-stat">
            <i class="fas ${s.icon}"></i>
            <strong>${s.value}</strong>
            <span>${s.label}</span>
          </div>`).join('')}
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-clock"></i> Batch Timings</div>
        <div class="cp-timings">
          ${c.timings.map(t => `
            <div class="cp-timing-card">
              <h4>${t.label}</h4>
              <p>${t.time}</p>
              <p>${t.days}</p>
            </div>`).join('')}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-chalkboard-teacher"></i> Faculty</div>
        <div class="cp-faculty-grid">
          ${c.faculty.map(f => `
            <div class="cp-faculty-card">
              <img src="${PICS[f.pic]}" alt="${f.name}" />
              <div>
                <strong>${f.name}</strong>
                <em>${f.role}</em>
                <span class="cp-fac-qual">${f.qual}</span>
                <p class="cp-fac-desc">${f.desc}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-list-check"></i> What's Included</div>
        <ul class="cp-includes">
          ${c.includes.map(item => `<li><i class="fas fa-check"></i>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-info-circle"></i> Course Info</div>
        <div class="cp-info-grid">
          ${c.info.map(i => `
            <div class="cp-info-item">
              <span>${i.label}</span>
              <strong>${i.value}</strong>
            </div>`).join('')}
        </div>
      </div>

      <div class="cp-section">
        <div class="cp-section-title"><i class="fas fa-tag"></i> Fee Structure</div>
        <div class="cp-pricing">
          ${c.pricing.map(p => `
            <div class="cp-price-card">
              <span>${p.plan}</span>
              <strong>${p.price}</strong>
              <em>${p.note}</em>
            </div>`).join('')}
        </div>
      </div>

      <div class="cp-cta">
        <p>Interested in this course? Book a free demo class today!</p>
        <a href="index.html#contact" class="btn-primary" onclick="closeCourse()">Enquire Now <i class="fas fa-arrow-right"></i></a>
      </div>

    </div>
  `;

  page.classList.add('open');
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeCourse() {
  document.getElementById('coursePage').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cpBack').addEventListener('click', closeCourse);


// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  this.reset();
  setTimeout(() => success.style.display = 'none', 5000);
});

// Smooth navbar shadow on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.boxShadow =
    window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.07)';
});

// ── REVIEW SYSTEM ──
const STORAGE_KEY = 'brightpath_reviews';

function getReviews() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const container = document.getElementById('userReviewsContainer');
  const reviews = getReviews();
  container.innerHTML = '';

  reviews.forEach((r, index) => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <button class="report-btn" data-index="${index}">
        <i class="fas fa-flag"></i> Report
      </button>
      <div class="stars">${stars}</div>
      <p>"${r.text}"</p>
      <div class="student">
        <div class="avatar">${r.name.charAt(0).toUpperCase()}</div>
        <div>
          <strong>${r.name}</strong>
          <span>${r.role}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Report button — ek click pe turant delete
  container.querySelectorAll('.report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const reviews = getReviews();
      reviews.splice(idx, 1);
      saveReviews(reviews);
      renderReviews();
    });
  });
}

// Modal open/close
const modal = document.getElementById('reviewModal');
document.getElementById('openReviewModal').addEventListener('click', () => modal.classList.add('active'));
document.getElementById('closeReviewModal').addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

// Star rating interaction
let selectedRating = 5;
const starInputs = document.querySelectorAll('.stars-input i');

function updateStars(val) {
  starInputs.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= val));
}

updateStars(5);

starInputs.forEach(star => {
  star.addEventListener('mouseover', () => updateStars(parseInt(star.dataset.val)));
  star.addEventListener('mouseout', () => updateStars(selectedRating));
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.val);
    updateStars(selectedRating);
  });
});

// Review form submit
document.getElementById('reviewForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('reviewName').value.trim();
  const role = document.getElementById('reviewRole').value.trim();
  const text = document.getElementById('reviewText').value.trim();

  const reviews = getReviews();
  reviews.unshift({ name, role, text, rating: selectedRating });
  saveReviews(reviews);
  renderReviews();

  this.reset();
  selectedRating = 5;
  updateStars(5);
  modal.classList.remove('active');
});

// Initial render
renderReviews();
