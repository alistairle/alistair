// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 移动端菜单切换 =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== 打字效果 =====
const typedTitle = document.getElementById('typedTitle');
const phrases = ['深夜写作者', '终身不浪漫主义者'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedTitle.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 60;
    } else {
        typedTitle.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 140;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 800);

// ===== 计算年龄（精确到天） =====
function calculateAge(birthDate) {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    const d = now.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
        years--;
    }
    // 计算从上一个生日到现在的天数
    const lastBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (lastBirthday > now) {
        lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
    }
    const days = Math.floor((now - lastBirthday) / (1000 * 60 * 60 * 24));
    return { years, days };
}

// ===== 计算工作年限（精确到天） =====
function calculateWork(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    const m = now.getMonth() - startDate.getMonth();
    const d = now.getDate() - startDate.getDate();
    if (m < 0 || (m === 0 && d < 0)) {
        years--;
    }
    // 计算从上一个周年日到现在的天数
    const lastAnniversary = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (lastAnniversary > now) {
        lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1);
    }
    const days = Math.floor((now - lastAnniversary) / (1000 * 60 * 60 * 24));
    return { years, days };
}

// ===== 更新年龄和工作年限显示 =====
function updateStats() {
    const birthDate = new Date(2003, 9, 27); // 2003年10月27日（月份从0开始）
    const workStart = new Date(2026, 6, 1);  // 2026年7月1日

    const age = calculateAge(birthDate);
    const work = calculateWork(workStart);

    // 年龄显示：X岁Y天
    document.getElementById('ageDisplay').textContent = `${age.years}岁${age.days}天`;

    // 工作年限显示：不足一年显示"X天"，满一年显示"X年Y天"
    if (work.years === 0) {
        document.getElementById('workDisplay').textContent = `${work.days}天`;
    } else {
        document.getElementById('workDisplay').textContent = `${work.years}年${work.days}天`;
    }
}

// 页面加载后更新统计
updateStats();

// ===== 数字滚动动画（已失效，但保留以防误删） =====
// 此处不再使用 stat-number 的 data-count 属性，因为已改为动态文本
// 但保留 observer 以防其他地方使用
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let current = 0;
            const increment = Math.ceil(target / 50);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 30);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => observer.observe(num));

// ===== 树洞表单提交（含邮箱选填验证） =====
const treeholeForm = document.getElementById('treeholeForm');
const emailInput = document.getElementById('emailInput');

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

treeholeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim() || '匿名朋友';
    const email = emailInput.value.trim();

    if (email && !isValidEmail(email)) {
        alert('📧 您填写的邮箱格式不正确，请重新输入。\n（若不需要回复，可留空）');
        emailInput.focus();
        return;
    }

    alert(`✨ 亲爱的 ${name}，\n\n感谢你的信任，你的心声我已经收到。\n${email ? '我会通过邮箱回复你。' : '如果你留了邮箱，我会尽快回复。'}\n\n愿你今天也拥有平静与力量。 🌿`);
    treeholeForm.reset();
    document.querySelectorAll('.auto-expand').forEach(el => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    });
});

// ===== 自动扩展 textarea 高度 =====
const autoExpandTextareas = document.querySelectorAll('.auto-expand');

autoExpandTextareas.forEach(textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});