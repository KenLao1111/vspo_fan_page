// DOM Elements
const themeSelect = document.getElementById('themeSelect');
const languageSelect = document.getElementById('languageSelect');
const profileBanner = document.getElementById('profileBanner');
const profileAvatar = document.getElementById('profileAvatar');
const liveStatus = document.getElementById('liveStatus');
const memberName = document.getElementById('memberName');
const memberTeam = document.getElementById('memberTeam');
const memberDebut = document.getElementById('memberDebut');
const memberBio = document.getElementById('memberBio');
const memberHeight = document.getElementById('memberHeight');
const memberBirthday = document.getElementById('memberBirthday');
const memberFanName = document.getElementById('memberFanName');
const memberGames = document.getElementById('memberGames');
const memberIllustrator = document.getElementById('memberIllustrator');
const memberHashtag = document.getElementById('memberHashtag');
const youtubeLink = document.getElementById('youtubeLink');
const twitterLink = document.getElementById('twitterLink');
const videosContainer = document.getElementById('videosContainer');
const videosLoading = document.getElementById('videosLoading');
const scheduleContainer = document.getElementById('scheduleContainer');
const scheduleLoading = document.getElementById('scheduleLoading');
const galleryContainer = document.getElementById('galleryContainer');

// YouTube API Key
const API_KEY = 'AIzaSyDYYbYgBB-L4mkInEiDmcMWHqK1FJMvDB8';

// Constants
const CACHE_VERSION = 1;
const CACHE_KEY = 'vspo_data_v' + CACHE_VERSION;
const THEME_KEY = 'vspo_theme';
const LANG_KEY = 'vspo_lang';
let currentLang = 'ja';
let currentMember = null;

// Get member ID from URL
function getMemberIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Initialize member profile
async function initializeProfile() {
    const memberId = getMemberIdFromUrl();
    if (!memberId || !memberData[memberId]) {
        window.location.href = 'index.html';
        return;
    }
    
    currentMember = memberData[memberId];
    updateProfileUI();
    checkLiveStatus();
    loadVideos();
    loadSchedule();
    loadGallery();
}

// Update profile UI with member data
function updateProfileUI() {
    // Set banner and avatar
    profileBanner.style.backgroundImage = `url('${currentMember.bannerImage || './assets/default-banner.jpg'}')`;
    profileAvatar.style.backgroundImage = `url('${currentMember.avatarImage}')`;
    
    // Set basic info
    memberName.textContent = currentMember.name;
    memberTeam.textContent = currentMember.teamName;
    
    // Format debut date
    const debutDate = new Date(currentMember.debut);
    const formattedDate = debutDate.toLocaleDateString(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    memberDebut.textContent = formattedDate;
    
    // Set bio based on language
    memberBio.textContent = currentMember.bio[currentLang] || currentMember.bio.en;
    
    // Set details
    memberHeight.textContent = currentMember.height;
    memberBirthday.textContent = currentMember.birthday;
    memberFanName.textContent = currentMember.fanName;
    memberGames.textContent = currentMember.favoriteGames;
    memberIllustrator.textContent = currentMember.illustrator;
    memberHashtag.textContent = currentMember.hashtag;
    
    // Set social links
    youtubeLink.href = currentMember.youtube;
    twitterLink.href = currentMember.twitter;
}

// Check live status
async function checkLiveStatus() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${currentMember.channelId}&type=video&eventType=live&key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            // 獲取直播開始時間
            const publishedAt = new Date(data.items[0].snippet.publishedAt);
            const currentTime = new Date();
            const hoursSincePublished = (currentTime - publishedAt) / (1000 * 60 * 60);
            
            // 如果直播時間超過12小時，進行額外驗證
            if (hoursSincePublished > 12) {
                console.log(`${currentMember.name} 的直播已經持續超過12小時，可能需要手動確認`);
                // 仍然顯示為直播，但添加警告
                liveStatus.classList.add('live');
                liveStatus.setAttribute('title', '直播時間超過12小時，可能需要確認');
            } else {
                // 正常顯示為直播
                liveStatus.classList.add('live');
            }
        } else {
            // 沒有直播
            liveStatus.classList.remove('live');
        }
    } catch (error) {
        console.error('Error checking live status:', error);
        liveStatus.classList.remove('live');
    }
}

// Load videos from YouTube API
async function loadVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${currentMember.channelId}&maxResults=12&order=date&type=video&key=${API_KEY}`
        );
        const data = await response.json();
        
        videosLoading.style.display = 'none';
        
        if (data.items && data.items.length > 0) {
            let videosHTML = '';
            
            for (const item of data.items) {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.high.url;
                const publishedAt = new Date(item.snippet.publishedAt);
                
                const formattedDate = publishedAt.toLocaleDateString(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                videosHTML += `
                    <div class="video-card" data-aos="fade-up">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <div class="video-thumbnail">
                                <img src="${thumbnail}" alt="${title}">
                            </div>
                            <div class="video-info">
                                <h3 class="video-title">${title}</h3>
                                <div class="video-date">${formattedDate}</div>
                            </div>
                        </a>
                    </div>
                `;
            }
            
            videosContainer.innerHTML = videosHTML;
        } else {
            videosContainer.innerHTML = `<p class="text-center">${translations[currentLang]['profile.noVideos']}</p>`;
        }
    } catch (error) {
        console.error('Error loading videos:', error);
        videosLoading.style.display = 'none';
        videosContainer.innerHTML = `<p class="text-center">${translations[currentLang]['profile.noVideos']}</p>`;
    }
}

// Load schedule (placeholder function - would need actual API integration)
function loadSchedule() {
    // This would normally fetch from an API
    scheduleLoading.style.display = 'none';
    
    // Placeholder schedule data
    const scheduleItems = [
        {
            date: new Date(Date.now() + 86400000), // Tomorrow
            title: 'VALORANT Ranked',
            description: 'Solo queue ranked games'
        },
        {
            date: new Date(Date.now() + 86400000 * 3), // 3 days later
            title: 'Minecraft with friends',
            description: 'Building a new base with other VSPO members'
        },
        {
            date: new Date(Date.now() + 86400000 * 5), // 5 days later
            title: 'Chatting stream',
            description: 'Q&A and talking with viewers'
        }
    ];
    
    if (scheduleItems.length > 0) {
        let scheduleHTML = '';
        
        for (const item of scheduleItems) {
            const day = item.date.getDate();
            const month = item.date.toLocaleDateString(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), { month: 'short' });
            const time = item.date.toLocaleTimeString(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            
            scheduleHTML += `
                <div class="schedule-item" data-aos="fade-up">
                    <div class="schedule-date">
                        <div class="schedule-day">${day}</div>
                        <div class="schedule-month">${month}</div>
                        <div class="schedule-time">${time}</div>
                    </div>
                    <div class="schedule-info">
                        <h3 class="schedule-title">${item.title}</h3>
                        <p class="schedule-description">${item.description}</p>
                    </div>
                </div>
            `;
        }
        
        scheduleContainer.innerHTML = scheduleHTML;
    } else {
        scheduleContainer.innerHTML = `<p class="text-center">${translations[currentLang]['profile.noSchedule']}</p>`;
    }
}

// Load gallery
function loadGallery() {
    if (currentMember.gallery && currentMember.gallery.length > 0) {
        let galleryHTML = '';
        
        for (const image of currentMember.gallery) {
            galleryHTML += `
                <div class="gallery-item" data-aos="fade-up">
                    <img src="${image}" alt="${currentMember.name} gallery image">
                </div>
            `;
        }
        
        galleryContainer.innerHTML = galleryHTML;
    } else {
        galleryContainer.innerHTML = `<p class="text-center">${translations[currentLang]['profile.noGallery']}</p>`;
    }
}

// Language Management
function updateLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    if (currentMember) {
        updateProfileUI();
        loadSchedule(); // Reload schedule with new language
    }
}

function initializeLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY) || navigator.language.split('-')[0];
    const supportedLangs = ['ja', 'en', 'zh'];
    currentLang = supportedLangs.includes(savedLang) ? savedLang : 'ja';
    languageSelect.value = currentLang;
    updateLanguage(currentLang);
}

languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    updateLanguage(selectedLang);
    localStorage.setItem(LANG_KEY, selectedLang);
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
}

function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(THEME_KEY, themeName);
}

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

// Initialize AOS
function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    initializeProfile();
    initializeAOS();
    
    // Set interval for live status check
    setInterval(checkLiveStatus, 5 * 60 * 1000); // Check live status every 5 minutes
});
