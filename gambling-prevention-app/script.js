// Simple breathing animation
const circle = document.getElementById('breath-circle');
const breathText = document.getElementById('breath-text');
const startBreath = document.getElementById('start-breath');
let breathing = false;

function breathe() {
    if (!breathing) return;
    breathText.textContent = 'Inhale';
    circle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        breathText.textContent = 'Exhale';
        circle.style.transform = 'scale(1)';
        setTimeout(breathe, 4000);
    }, 4000);
}

startBreath.addEventListener('click', () => {
    breathing = !breathing;
    startBreath.textContent = breathing ? 'Stop' : 'Begin';
    if (breathing) breathe();
});

// Simple chat coach
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const responses = [
    "Stay focused on your goals!",
    "Remember why you started this journey.",
    "Take a deep breath and stay calm.",
    "You're in control of your actions.",
    "Keep going, you're doing great!"
];

function addMessage(text, fromUser = true) {
    const div = document.createElement('div');
    div.textContent = text;
    div.className = fromUser ? 'user' : 'coach';
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendChat.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg);
    chatInput.value = '';
    setTimeout(() => {
        const resp = responses[Math.floor(Math.random() * responses.length)];
        addMessage(resp, false);
    }, 500);
});

// Simple journaling using localStorage
const journalEntry = document.getElementById('journal-entry');
const journalLog = document.getElementById('journal-log');
const saveJournal = document.getElementById('save-journal');

function loadJournal() {
    const items = JSON.parse(localStorage.getItem('journal') || '[]');
    journalLog.innerHTML = '';
    items.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item;
        journalLog.appendChild(p);
    });
}

saveJournal.addEventListener('click', () => {
    const text = journalEntry.value.trim();
    if (!text) return;
    const items = JSON.parse(localStorage.getItem('journal') || '[]');
    items.push(text);
    localStorage.setItem('journal', JSON.stringify(items));
    journalEntry.value = '';
    loadJournal();
});

window.addEventListener('load', loadJournal);
