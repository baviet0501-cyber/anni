// DOM Elements
const counterScreen = document.getElementById('counterScreen');

// Counter elements
const daysCounter = document.getElementById('daysCounter');
const hoursCounter = document.getElementById('hoursCounter');
const minutesCounter = document.getElementById('minutesCounter');
const secondsCounter = document.getElementById('secondsCounter');
const displayYourName = document.getElementById('displayYourName');
const displayPartnerName = document.getElementById('displayPartnerName');
const displayStartDate = document.getElementById('displayStartDate');
const milestonesContainer = document.getElementById('milestones');

// ❤️ HARDCODED INFORMATION - Vjet & Mì ❤️
const FIXED_DATA = {
    START_DATE: '2024-11-13',  // 13/11/2024
    YOUR_NAME: 'Vjet',
    PARTNER_NAME: 'Mì'
};

// Global variables
let startDate = null;
let counterInterval = null;

// Initialize app
function init() {
    createParticles();
    createHearts();

    // Load hardcoded data
    loadHardcodedData();

    // Initialize draggable photos
    initDraggablePhotos();

    // Initialize PWA install prompt
    initPWA();
}

// PWA Installation
let deferredPrompt;

function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/anni/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }

    // Capture install prompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent default browser prompt
        e.preventDefault();
        // Store event for later use
        deferredPrompt = e;

        // Show install prompt after 3 seconds
        setTimeout(() => {
            showInstallPrompt();
        }, 3000);
    });

    // Detect if already installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully!');
        deferredPrompt = null;
    });
}

function showInstallPrompt() {
    if (!deferredPrompt) {
        return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
}

// Initialize draggable photos
function initDraggablePhotos() {
    const photos = document.querySelectorAll('.floating-photo');

    photos.forEach(photo => {
        let isDragging = false;
        let startX, startY;
        let photoLeft, photoTop;

        // Mouse events
        photo.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Touch events for mobile
        photo.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);

        function dragStart(e) {
            if (e.target === photo || photo.contains(e.target)) {
                isDragging = true;
                photo.classList.add('dragging');

                // Temporarily remove animation while dragging
                const currentAnimation = photo.style.animation;
                photo._previousAnimation = currentAnimation;
                photo.style.animation = 'none';

                // Get current position of photo
                const rect = photo.getBoundingClientRect();
                photoLeft = rect.left;
                photoTop = rect.top;

                // Get mouse/touch position
                if (e.type === 'touchstart') {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                } else {
                    startX = e.clientX;
                    startY = e.clientY;
                }

                // Calculate offset from mouse to photo top-left
                const offsetX = startX - photoLeft;
                const offsetY = startY - photoTop;

                // Store offset
                photo._offsetX = offsetX;
                photo._offsetY = offsetY;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                let currentX, currentY;

                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX;
                    currentY = e.touches[0].clientY;
                } else {
                    currentX = e.clientX;
                    currentY = e.clientY;
                }

                // Calculate new position maintaining the offset
                const newLeft = currentX - photo._offsetX;
                const newTop = currentY - photo._offsetY;

                // Apply new position
                photo.style.left = newLeft + 'px';
                photo.style.top = newTop + 'px';
                photo.style.bottom = 'auto';
                photo.style.right = 'auto';
                photo.style.transform = 'none';
            }
        }

        function dragEnd(e) {
            if (isDragging) {
                isDragging = false;
                photo.classList.remove('dragging');

                // Add gentle sway animation after dragging
                photo.classList.add('has-been-moved');
                photo.style.animation = '';  // Remove inline style to let class take effect
            }
        }
    });
}

// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 25}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 20}s`;

        particlesContainer.appendChild(particle);
    }
}

// Create floating hearts
function createHearts() {
    const heartsContainer = document.getElementById('hearts');

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

// Load hardcoded data (Vjet & Mì)
function loadHardcodedData() {
    // Set the hardcoded values - Using Vietnam timezone (UTC+7)
    // Create date as Vietnam time (2024-11-13 00:00:00 UTC+7)
    const dateStr = FIXED_DATA.START_DATE; // '2024-11-13'
    const [year, month, day] = dateStr.split('-').map(Number);

    // Create date in UTC
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    // Adjust to Vietnam timezone (UTC+7) - subtract 7 hours to get the correct midnight in Vietnam
    startDate = new Date(utcDate.getTime() - (7 * 3600000));

    displayYourName.textContent = FIXED_DATA.YOUR_NAME;
    displayPartnerName.textContent = FIXED_DATA.PARTNER_NAME;
    displayStartDate.textContent = formatDate(startDate);

    // Show counter screen directly
    showCounterScreen();
    startCounter();
}

// Show counter screen
function showCounterScreen() {
    // No need to toggle anymore, just ensure it's visible
    counterScreen.classList.remove('hidden');
}

// Start the counter
function startCounter() {
    updateCounter(); // Initial update

    if (counterInterval) {
        clearInterval(counterInterval);
    }

    counterInterval = setInterval(updateCounter, 1000);
    updateMilestones();
}

// Update counter display
function updateCounter() {
    if (!startDate) return;

    // Get current time in Vietnam timezone (UTC+7)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const vietnamTime = new Date(utcTime + (7 * 3600000)); // UTC+7

    const diffMs = vietnamTime - startDate;

    // Calculate time units
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Update displays with animations
    updateCounterValue(daysCounter, days);
    updateCounterValue(hoursCounter, hours % 24);
    updateCounterValue(minutesCounter, minutes % 60);
    updateCounterValue(secondsCounter, seconds % 60);
}

// Update counter value with animation
function updateCounterValue(element, newValue) {
    const currentValue = element.textContent;
    const formattedValue = String(newValue).padStart(2, '0');

    if (currentValue !== formattedValue) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.textContent = formattedValue;
            element.style.animation = 'countPulse 0.5s ease';
        }, 10);
    }
}

// Update milestones
function updateMilestones() {
    if (!startDate) return;

    const now = new Date();
    const diffMs = now - startDate;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const milestones = [];

    // Check for special milestones
    const milestoneList = [
        { days: 100, title: '🎉 100 ngày bên nhau!', emoji: '🎊' },
        { days: 365, title: '🎂 1 năm yêu nhau!', emoji: '🥳' },
        { days: 500, title: '💫 500 ngày bên nhau!', emoji: '✨' },
        { days: 730, title: '🎈 2 năm yêu nhau!', emoji: '🎁' },
        { days: 1000, title: '👑 1000 ngày bên nhau!', emoji: '💎' },
        { days: 1095, title: '🌟 3 năm yêu nhau!', emoji: '🌺' },
        { days: 1460, title: '🎊 4 năm yêu nhau!', emoji: '🎪' },
        { days: 1825, title: '💝 5 năm yêu nhau!', emoji: '🎆' }
    ];

    // Find upcoming and recent milestones
    milestoneList.forEach(milestone => {
        if (days >= milestone.days && days < milestone.days + 7) {
            const milestoneDate = new Date(startDate);
            milestoneDate.setDate(milestoneDate.getDate() + milestone.days);
            milestones.push({
                title: milestone.title,
                date: formatDate(milestoneDate),
                type: 'passed'
            });
        } else if (days < milestone.days && milestone.days - days <= 30) {
            const daysLeft = milestone.days - days;
            const milestoneDate = new Date(startDate);
            milestoneDate.setDate(milestoneDate.getDate() + milestone.days);
            milestones.push({
                title: `${milestone.emoji} Còn ${daysLeft} ngày nữa đến ${milestone.title.substring(2)}`,
                date: formatDate(milestoneDate),
                type: 'upcoming'
            });
        }
    });

    // Render milestones
    milestonesContainer.innerHTML = '';
    milestones.forEach(milestone => {
        const milestoneEl = document.createElement('div');
        milestoneEl.className = 'milestone';
        milestoneEl.innerHTML = `
            <div class="milestone-title">${milestone.title}</div>
            <div class="milestone-date">${milestone.date}</div>
        `;
        milestonesContainer.appendChild(milestoneEl);
    });
}

// Format date for display
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
