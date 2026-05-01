/**
 * VoteWise Assistant - Logic Controller
 * Features: Countdown, Navigation, and Eligibility Check
 */

// 1. Countdown Timer Logic
const targetDate = new Date("Nov 5, 2026 08:00:00").getTime();

const updateTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (distance < 0) {
        clearInterval(updateTimer);
        timerElement.innerHTML = "ELECTION DAY IS HERE!";
    }
}, 1000);

// 2. Navigation & Dynamic Content Loading
const contentData = {
    'home': {
        title: 'Welcome to VoteWise',
        body: '<p class="section-desc">Your central hub for voter readiness. Select a category from the sidebar to get started.</p>'
    },
    'candidates': {
        title: 'Local Candidates',
        body: '<ul class="info-list"><li><b>District 4:</b> Candidate A vs Candidate B</li><li><b>District 7:</b> Candidate C vs Candidate D</li></ul>'
    },
    'polling': {
        title: 'Polling Stations',
        body: '<p>Find your nearest station by entering your zip code below.</p><input type="text" placeholder="Enter Zip Code..." class="search-box" style="margin-top:15px;">'
    }
};

function navigate(section) {
    const card = document.getElementById('mainContent');
    const data = contentData[section];

    if (data) {
        // Apply smooth transition effect
        card.style.opacity = 0;
        setTimeout(() => {
            card.innerHTML = `<h2>${data.title}</h2>${data.body}`;
            card.style.opacity = 1;
        }, 200);
    }
    
    // Update active state in UI
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// 3. Eligibility Quiz Logic
function checkEligibility() {
    const age = parseInt(prompt("Please enter your age:"));
    
    if (isNaN(age) || age < 1) {
        alert("Invalid input. Please enter a valid age.");
    } else if (age < 18) {
        alert(`You are ${age} years old. You are not yet eligible to vote.`);
    } else {
        alert("Congratulations! You are eligible to vote. Ensure you are registered!");
    }
}

// 4. Search Filter Logic
const searchInput = document.getElementById('mainSearch');
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        console.log(`Searching for: ${term}`);
        // Implementation for filtering actual data arrays would go here
    });
}
// 1. Data Store for Knowledge Base
const electionData = {
    process: {
        title: "Election Process",
        icon: "refresh-cw",
        description: "The steps involved in conducting a fair election:",
        items: ["Announcement of Dates", "Filing of Nominations", "Campaigning Phase", "Polling Day", "Counting & Results"],
        type: "ul"
    },
    timeline: {
        title: "Important Timeline",
        icon: "calendar",
        description: "Upcoming milestones for the 2026 Election Cycle:",
        items: ["Jan 15: Registration Deadline", "Feb 10: Nomination Scrutiny", "March 05: Polling Day", "March 10: Final Results"],
        type: "ul"
    },
    steps: {
        title: "How to Vote",
        icon: "list-checks",
        description: "Your journey inside the polling booth:",
        items: ["Identify yourself with your ID Card", "Get your finger marked with ink", "Go to the EVM Voting Compartment", "Press the button for your candidate", "Check the VVPAT slip confirmation"],
        type: "ol"
    },
    eligibility: {
        title: "Eligibility Quiz",
        icon: "user-check",
        description: "Check if you are ready to vote:",
        isQuiz: true // Special flag for the Quiz
    },
    documents: {
        title: "Required Documents",
        icon: "file-text",
        description: "Bring one of these valid IDs to the booth:",
        items: ["Voter ID Card (EPIC)", "Aadhaar Card", "PAN Card", "Passport", "Driving License", "Bank Passbook with Photo"],
        type: "ul"
    }
};

// 2. Navigation Handler
function handleNav(btn, type) {
    // Update active button UI
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const output = document.getElementById('output');
    const data = electionData[type];

    if (data.isQuiz) {
        // Special render for Eligibility Quiz
        output.innerHTML = `
            <h2><i data-lucide="user-check"></i> Eligibility Checker</h2>
            <div class="quiz-container">
                <p><strong>Question:</strong> Are you 18 years or older?</p>
                <div class="quiz-buttons">
                    <button class="quiz-btn" onclick="quizResult(true)">Yes</button>
                    <button class="quiz-btn" onclick="quizResult(false)">No</button>
                </div>
                <div id="quiz-output"></div>
            </div>
        `;
    } else {
        // Standard Content Render
        output.innerHTML = `
            <div class="content-header">
                <h2><i data-lucide="${data.icon}"></i> ${data.title}</h2>
            </div>
            <p class="section-desc">${data.description}</p>
            <${data.type} class="info-list">
                ${data.items.map(item => `<li>${item}</li>`).join('')}
            </${data.type}>
        `;
    }
    lucide.createIcons(); // Refresh icons
}

// 3. Quiz Logic
function quizResult(isEligible) {
    const resDiv = document.getElementById('quiz-output');
    if (isEligible) {
        resDiv.innerHTML = `<div class="alert-success">✅ <strong>You are eligible!</strong> Make sure you are registered.</div>`;
    } else {
        resDiv.innerHTML = `<div class="alert-fail">❌ <strong>Not eligible.</strong> You must be 18 to vote.</div>`;
    }
}

// 4. Countdown Timer
function startCountdown() {
    const target = new Date("March 05, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById("timer").innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}

window.onload = startCountdown;
// 1. Multi-language Database
const contentDB = {
    en: {
        process: {
            title: "Election Process",
            icon: "refresh-cw",
            steps: ["Voter List Revision", "Nomination Filing", "Scrutiny of Papers", "Campaigning", "Voting & Counting"]
        },
        timeline: {
            title: "Election Timeline 2026",
            icon: "calendar",
            steps: ["Jan 10: Registration Starts", "Feb 01: Final List Out", "March 05: Polling Day", "March 12: Results"]
        },
        steps: {
            title: "Step-by-Step Voting Guide",
            icon: "list-checks",
            steps: ["Verify name at booth", "Ink marking by official", "Move to EVM machine", "Press blue button for candidate", "Wait for VVPAT beep"]
        },
        documents: {
            title: "Valid Identity Proofs",
            icon: "file-text",
            steps: ["Voter ID (EPIC Card)", "Aadhaar Card", "Driving License", "Indian Passport", "MNREGA Job Card"]
        }
    },
    hi: {
        process: {
            title: "चुनाव प्रक्रिया",
            icon: "refresh-cw",
            steps: ["मतदाता सूची संशोधन", "नामांकन दाखिल करना", "कागजों की जांच", "चुनाव प्रचार", "मतदान और मतगणना"]
        },
        steps: {
            title: "मतदान की चरण-दर-चरण मार्गदर्शिका",
            icon: "list-checks",
            steps: ["बूथ पर नाम सत्यापित करें", "अधिकारी द्वारा स्याही लगाना", "ईवीएम मशीन पर जाएं", "उम्मीदवार के लिए नीला बटन दबाएं", "VVPAT बीप का इंतज़ार करें"]
        }
    }
};

let currentLang = 'en';

// 2. Navigation & Content Handler
function handleNav(btn, type) {
    // UI Update: Active Button
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const output = document.getElementById('output');
    
    // Quiz Special Case
    if (type === 'eligibility') {
        renderQuiz();
        return;
    }

    const data = contentDB[currentLang][type] || contentDB['en'][type];

    output.innerHTML = `
        <div class="fade-in">
            <h2><i data-lucide="${data.icon}"></i> ${data.title}</h2>
            <hr class="divider">
            <ul class="advanced-list">
                ${data.steps.map((step, index) => `
                    <li style="--delay: ${index * 0.1}s">
                        <span class="step-num">${index + 1}</span>
                        <p>${step}</p>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    lucide.createIcons();
}

// 3. Advanced Quiz Logic
function renderQuiz() {
    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="quiz-box fade-in">
            <h2><i data-lucide="user-check"></i> Eligibility Validator</h2>
            <p>Verify your voting rights instantly.</p>
            <div class="input-group">
                <label>Enter your age:</label>
                <input type="number" id="userAge" placeholder="e.g. 21">
            </div>
            <div class="input-group">
                <label>Citizenship:</label>
                <select id="citizenStatus">
                    <option value="indian">Indian Citizen</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button class="primary-btn" onclick="validateEligibility()">Check Status</button>
            <div id="quizResult"></div>
        </div>
    `;
    lucide.createIcons();
}

function validateEligibility() {
    const age = document.getElementById('userAge').value;
    const citizen = document.getElementById('citizenStatus').value;
    const res = document.getElementById('quizResult');

    if(age >= 18 && citizen === 'indian') {
        res.innerHTML = `<div class="status-pass">✅ You are Eligible to vote! Please ensure you have a Voter ID.</div>`;
    } else {
        res.innerHTML = `<div class="status-fail">❌ You are not eligible. Requirements: Age 18+ and Indian Citizenship.</div>`;
    }
}

// 4. Global Search Logic
function filterContent() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    if(input.length > 2) {
        console.log("Searching for: " + input);
        // Practical tip: In a real app, you would filter the contentDB keys here.
    }
}

// 5. Language Toggle (Roadmap Feature)
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    alert("Language changed to: " + (currentLang === 'en' ? "English" : "Hindi"));
}

// 6. Live Countdown
const countdown = () => {
    const electionDate = new Date("March 05, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const gap = electionDate - now;

    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
    
    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById("timer").innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
};
setInterval(countdown, 1000);