// Get the current date
const today = new Date();
const currentYear = today.getFullYear();

// Set the birthday date (month is 0-based, so subtract 1 from the actual month)
const birthday = new Date(currentYear, today.getMonth(), today.getDate());

// If birthday has passed this year, set it for next year
if (today > birthday) {
    birthday.setFullYear(currentYear + 1);
}

// Update the countdown every second
function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Add leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Add animation class when numbers change
    const elements = ['days', 'hours', 'minutes', 'seconds'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        element.classList.add('animate');
        setTimeout(() => element.classList.remove('animate'), 1000);
    });
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Age Countdown Functionality
let ageCountdownInterval;
const startButton = document.getElementById('startAgeCountdown');
const ageNumber = document.getElementById('ageNumber');
const birthdayMessage = document.getElementById('birthdayMessage');
const fireworksContainer = document.getElementById('fireworks');

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.setProperty('--x', `${x}px`);
    firework.style.setProperty('--y', `${y}px`);
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    fireworksContainer.appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

function createFireworks() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFirework(x, y);
        }, i * 100);
    }
}

function startAgeCountdown() {
    let age = 24;
    startButton.disabled = true;
    
    ageCountdownInterval = setInterval(() => {
        if (age > 0) {
            age--;
            ageNumber.textContent = age;
        } else {
            clearInterval(ageCountdownInterval);
            birthdayMessage.classList.remove('hidden');
            createFireworks();
            // Add a slight delay before showing the alert
            setTimeout(() => {
                alert('Anthony you are the greatest hacker');
            }, 1000);
        }
    }, 1000);
}

startButton.addEventListener('click', startAgeCountdown); 