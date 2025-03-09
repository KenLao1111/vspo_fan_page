// DOM Elements
const themeSelect = document.getElementById('themeSelect');
const languageSelect = document.getElementById('languageSelect');
const loadingScreen = document.querySelector('.loading-screen');
const memberSearch = document.getElementById('memberSearch');
const teamFilter = document.getElementById('teamFilter');
const statusFilter = document.getElementById('statusFilter');

// YouTube API Key
const API_KEY = 'AIzaSyDYYbYgBB-L4mkInEiDmcMWHqK1FJMvDB8';

// Constants
const CACHE_VERSION = 1;
const CACHE_KEY = 'vspo_data_v' + CACHE_VERSION;
const THEME_KEY = 'vspo_theme';
const LANG_KEY = 'vspo_lang';

// 主題設定
const themes = {
    light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f8f9fa',
        '--text-color': '#333333',
        '--primary-color': '#007bff',
        '--border-color': '#dee2e6'
    },
    dark: {
        '--bg-primary': '#1a1a1a',
        '--bg-secondary': '#2d2d2d',
        '--text-color': '#ffffff',
        '--primary-color': '#00a8ff',
        '--border-color': '#404040'
    },
    sepia: {
        '--bg-primary': '#f4ecd8',
        '--bg-secondary': '#e9dfc1',
        '--text-color': '#5c4b37',
        '--primary-color': '#8b4513',
        '--border-color': '#d3c4a8'
    },
    gaming: {
        '--bg-primary': '#0a0a23',
        '--bg-secondary': '#1a1a3a',
        '--text-color': '#00ff00',
        '--primary-color': '#ff00ff',
        '--border-color': '#4a4a7a'
    }
};

// Language Management
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function initializeLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY) || navigator.language.split('-')[0];
    const supportedLangs = ['ja', 'en', 'zh'];
    const lang = supportedLangs.includes(savedLang) ? savedLang : 'ja';
    languageSelect.value = lang;
    updateLanguage(lang);
}

languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
    localStorage.setItem(LANG_KEY, selectedLang);
});

// Live Status Check
async function checkLiveStatus() {
    // 獲取所有帶有 data-member 屬性的成員卡片
    const memberCards = document.querySelectorAll('.member-card[data-member]');
    
    // 從 member-data.js 獲取頻道 ID
    for (const card of memberCards) {
        const memberId = card.getAttribute('data-member');
        if (!memberId) continue;
        
        // 從 memberData 中獲取頻道 ID
        const channelId = memberData[memberId]?.channelId;
        if (!channelId) continue;
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${API_KEY}`
            );
            const data = await response.json();
            
            const liveStatus = card.querySelector('.live-status');
            
            if (data.items && data.items.length > 0) {
                // 獲取直播開始時間
                const publishedAt = new Date(data.items[0].snippet.publishedAt);
                const currentTime = new Date();
                const hoursSincePublished = (currentTime - publishedAt) / (1000 * 60 * 60);
                
                // 如果直播時間超過12小時，進行額外驗證
                if (hoursSincePublished > 12) {
                    console.log(`${memberId} 的直播已經持續超過12小時，可能需要手動確認`);
                    // 仍然顯示為直播，但添加警告
                    card.setAttribute('data-live', 'true');
                    if (liveStatus) {
                        liveStatus.classList.add('live');
                        liveStatus.setAttribute('title', '直播時間超過12小時，可能需要確認');
                    }
                } else {
                    // 正常顯示為直播
                    card.setAttribute('data-live', 'true');
                    if (liveStatus) {
                        liveStatus.classList.add('live');
                    }
                }
            } else {
                // 沒有直播
                card.setAttribute('data-live', 'false');
                if (liveStatus) {
                    liveStatus.classList.remove('live');
                }
            }
        } catch (error) {
            console.error(`Error checking live status for ${memberId}:`, error);
        }
    }
}

// Member Cards
function initializeMemberCards() {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
        // Add Bootstrap classes
        card.classList.add('shadow-sm');
        
        // Add AOS animation
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', Math.random() * 300);
        
        // Add click event
        card.addEventListener('click', () => {
            const memberName = card.getAttribute('data-member');
            if (memberName) {
                showMemberDetails(memberName);
            }
        });

        // Adjust name size
        const nameElement = card.querySelector('.member-name');
        if (nameElement) {
            const nameLength = nameElement.textContent.length;
            if (nameLength > 6) {
                nameElement.setAttribute('data-length', 'long');
            }
            if (nameLength > 8) {
                nameElement.setAttribute('data-length', 'very-long');
            }
        }
    });
}

// Modal Details
function showMemberDetails(memberName) {
    // Create modal element
    const modalHtml = `
        <div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="memberModalLabel">${translations[currentLang]?.members[memberName]?.name || memberName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="./assets/${memberName}.webp" class="img-fluid rounded" alt="${memberName}">
                            </div>
                            <div class="col-md-6">
                                <h6>${translations[currentLang]?.members[memberName]?.title || ''}</h6>
                                <p>${translations[currentLang]?.members[memberName]?.description || ''}</p>
                                <div class="social-links mt-3">
                                    <button class="btn btn-primary me-2" onclick="shareOnTwitter('${memberName}')">
                                        <i class="fab fa-twitter"></i> Share
                                    </button>
                                    <button class="btn btn-primary" onclick="shareOnFacebook()">
                                        <i class="fab fa-facebook"></i> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('memberModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Get the modal element
    const modalElement = document.getElementById('memberModal');

    // Initialize and show the modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Social Share
function shareOnTwitter(memberName = '') {
    const text = memberName ? 
        `Check out ${memberName} from VSPO!` : 
        'Check out VSPO! Virtual eSports Project';
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnLine() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank');
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            showToast('連結已複製到剪貼板！');
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            showToast('複製失敗，請手動複製。');
        });
}

// 顯示提示訊息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Search and Filter
function filterMembers() {
    const searchTerm = memberSearch.value.toLowerCase();
    const selectedTeam = teamFilter.value;
    const selectedStatus = statusFilter.value;

    document.querySelectorAll('.member-card').forEach(card => {
        const memberName = card.querySelector('.member-name').textContent.toLowerCase();
        const team = card.getAttribute('data-team');
        const isLive = card.getAttribute('data-live') === 'true';
        
        const matchesSearch = memberName.includes(searchTerm);
        const matchesTeam = selectedTeam === 'all' || team === selectedTeam;
        const matchesStatus = selectedStatus === 'all' || 
            (selectedStatus === 'live' && isLive) || 
            (selectedStatus === 'offline' && !isLive);

        if (matchesSearch && matchesTeam && matchesStatus) {
            card.style.display = '';
            // Add fade-in animation
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });

    // Update team sections visibility
    document.querySelectorAll('.team-section').forEach(section => {
        const hasVisibleCards = Array.from(section.querySelectorAll('.member-card'))
            .some(card => card.style.display !== 'none');
        section.style.display = hasVisibleCards ? '' : 'none';
    });
}

// Add event listeners for search and filters
memberSearch.addEventListener('input', filterMembers);
teamFilter.addEventListener('change', filterMembers);
statusFilter.addEventListener('change', filterMembers);

// Responsive Design
function handleResponsiveDesign() {
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('is-mobile', isMobile);
}

// Event Listeners
window.addEventListener('resize', handleResponsiveDesign);

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// 本地緩存
async function loadCachedData() {
    try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            if (Date.now() - data.timestamp < 3600000) { // 1小時更新一次
                updateMemberCards(data.members);
                return;
            }
        }
        await fetchAndCacheData();
    } catch (error) {
        console.error('Error loading cached data:', error);
    }
}

async function fetchAndCacheData() {
    try {
        const response = await fetch('https://api.example.com/vspo/members');
        const data = await response.json();
        const cacheData = {
            timestamp: Date.now(),
            members: data
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        updateMemberCards(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// 卡片 3D 效果
function handleCardHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function resetCardPosition(e) {
    const card = e.currentTarget;
    card.style.transform = '';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    loadCachedData();
    initializeAOS();
    setupEventListeners();
    handleResponsiveDesign();
    checkLiveStatus();
});

// 主題初始化
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}

// 應用主題
function applyTheme(themeName) {
    const theme = themes[themeName];
    Object.entries(theme).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
    });
    localStorage.setItem(THEME_KEY, themeName);
}

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

// Initialize AOS
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', resetCardPosition);
    });
}

// Update Member Cards
function updateMemberCards(members) {
    // Update member cards with new data
    // ...
}

// Set Interval for Live Status Check
setInterval(checkLiveStatus, 5 * 60 * 1000); // Check live status every 5 minutes