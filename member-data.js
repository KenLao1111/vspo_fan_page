// Member data with detailed information
const memberData = {
    // LVG Members
    sumire: {
        id: 'sumire',
        name: '花芽すみれ',
        nameEn: 'Kaga Sumire',
        nameZh: '花芽菫',
        team: 'lvg',
        teamName: 'Lupinus Virtual Games',
        debut: '2018-10-31',
        channelId: 'UCyLGcqYs7RsBb3L0SJfzGYA',
        youtube: 'https://www.youtube.com/@KagaSumire',
        twitter: 'https://twitter.com/sumire_kaga',
        bio: {
            ja: 'LVGの一員として活動する花芽すみれ。FPSゲームを中心に配信を行い、その高い技術力と明るい性格で人気を集めている。',
            en: 'Kaga Sumire is a member of LVG. She mainly streams FPS games and is popular for her high skill level and cheerful personality.',
            zh: '作為LVG的一員，花芽菫主要直播FPS遊戲，憑藉著高超的技術和開朗的性格受到歡迎。'
        },
        height: '148cm',
        birthday: '5月2日',
        fanName: 'すみれーず',
        favoriteGames: 'VALORANT, Apex Legends, Minecraft',
        illustrator: 'けんぴゃっ',
        hashtag: '#花芽すみれ',
        bannerImage: './assets/banner-sumire.jpg',
        avatarImage: './assets/sd-sumire-1.webp',
        gallery: [
            './assets/gallery-sumire-1.jpg',
            './assets/gallery-sumire-2.jpg',
            './assets/gallery-sumire-3.jpg'
        ]
    },
    nazuna: {
        id: 'nazuna',
        name: '花芽なずな',
        nameEn: 'Kaga Nazuna',
        nameZh: '花芽奈津菜',
        team: 'lvg',
        teamName: 'Lupinus Virtual Games',
        debut: '2018-10-31',
        channelId: 'UCiMG6VdScBabPhJ1ZtaVmbw',
        youtube: 'https://www.youtube.com/@nazunakaga',
        twitter: 'https://twitter.com/nazuna_kaga',
        bio: {
            ja: 'LVGの一員として活動する花芽なずな。様々なゲームをプレイし、特にホラーゲームでの反応が人気。すみれとは姉妹の関係。',
            en: 'Kaga Nazuna is a member of LVG. She plays various games and is especially popular for her reactions during horror games. She is Sumire\'s sister.',
            zh: '作為LVG的一員，花芽奈津菜玩各種遊戲，尤其以恐怖遊戲中的反應最受歡迎。她是菫的妹妹。'
        },
        height: '152cm',
        birthday: '7月15日',
        fanName: 'なずリス',
        favoriteGames: 'Minecraft, Horror Games, RPGs',
        illustrator: 'けんぴゃっ',
        hashtag: '#花芽なずな',
        bannerImage: './assets/banner-nazuna.jpg',
        avatarImage: './assets/sd-nazuna-1.webp',
        gallery: [
            './assets/gallery-nazuna-1.jpg',
            './assets/gallery-nazuna-2.jpg',
            './assets/gallery-nazuna-3.jpg'
        ]
    },
    uruha: {
        id: 'uruha',
        name: '一ノ瀬うるは',
        nameEn: 'Ichinose Uruha',
        nameZh: '一之瀨潤羽',
        team: 'lvg',
        teamName: 'Lupinus Virtual Games',
        debut: '2019-05-19',
        channelId: 'UC5LyYg6cCA4yHEYvtUsir3g',
        youtube: 'https://www.youtube.com/@uruhaichinose',
        twitter: 'https://twitter.com/uruha_ichinose',
        bio: {
            ja: 'LVGの一員として活動する一ノ瀬うるは。FPSゲームが得意で、特にVALORANTでの実力は高い。冷静沈着な性格だが、時折見せる可愛らしい一面も人気。',
            en: 'Ichinose Uruha is a member of LVG. She is skilled at FPS games, especially VALORANT. While she has a calm and composed personality, her occasional cute side is also popular.',
            zh: '作為LVG的一員，一之瀨潤羽擅長FPS遊戲，尤其在VALORANT中表現出色。雖然性格冷靜沉著，但偶爾展現的可愛一面也很受歡迎。'
        },
        height: '160cm',
        birthday: '9月9日',
        fanName: 'うるリス',
        favoriteGames: 'VALORANT, Apex Legends, Minecraft',
        illustrator: 'ぽんず',
        hashtag: '#一ノ瀬うるは',
        bannerImage: './assets/banner-uruha.jpg',
        avatarImage: './assets/sd-uruha-1.webp',
        gallery: [
            './assets/gallery-uruha-1.jpg',
            './assets/gallery-uruha-2.jpg',
            './assets/gallery-uruha-3.jpg'
        ]
    },
    
    // Add more members as needed with the same structure
};

// Add translations for profile page
translations.ja['backToHome'] = 'ホームに戻る';
translations.en['backToHome'] = 'Back to Home';
translations.zh['backToHome'] = '返回首頁';

translations.ja['profile.aboutTab'] = 'プロフィール';
translations.en['profile.aboutTab'] = 'About';
translations.zh['profile.aboutTab'] = '關於';

translations.ja['profile.videosTab'] = '動画';
translations.en['profile.videosTab'] = 'Videos';
translations.zh['profile.videosTab'] = '影片';

translations.ja['profile.scheduleTab'] = '配信予定';
translations.en['profile.scheduleTab'] = 'Schedule';
translations.zh['profile.scheduleTab'] = '直播計劃';

translations.ja['profile.galleryTab'] = 'ギャラリー';
translations.en['profile.galleryTab'] = 'Gallery';
translations.zh['profile.galleryTab'] = '圖庫';

translations.ja['profile.detailsTitle'] = '詳細情報';
translations.en['profile.detailsTitle'] = 'Details';
translations.zh['profile.detailsTitle'] = '詳細資料';

translations.ja['profile.height'] = '身長:';
translations.en['profile.height'] = 'Height:';
translations.zh['profile.height'] = '身高:';

translations.ja['profile.birthday'] = '誕生日:';
translations.en['profile.birthday'] = 'Birthday:';
translations.zh['profile.birthday'] = '生日:';

translations.ja['profile.fanName'] = 'ファンネーム:';
translations.en['profile.fanName'] = 'Fan Name:';
translations.zh['profile.fanName'] = '粉絲名稱:';

translations.ja['profile.favoriteGames'] = '好きなゲーム:';
translations.en['profile.favoriteGames'] = 'Favorite Games:';
translations.zh['profile.favoriteGames'] = '喜愛的遊戲:';

translations.ja['profile.illustrator'] = 'イラストレーター:';
translations.en['profile.illustrator'] = 'Illustrator:';
translations.zh['profile.illustrator'] = '繪師:';

translations.ja['profile.hashtag'] = 'ハッシュタグ:';
translations.en['profile.hashtag'] = 'Hashtag:';
translations.zh['profile.hashtag'] = '標籤:';

translations.ja['profile.noVideos'] = '動画が見つかりませんでした';
translations.en['profile.noVideos'] = 'No videos found';
translations.zh['profile.noVideos'] = '未找到影片';

translations.ja['profile.noSchedule'] = '予定された配信はありません';
translations.en['profile.noSchedule'] = 'No scheduled streams';
translations.zh['profile.noSchedule'] = '暫無直播計劃';

translations.ja['profile.noGallery'] = '画像がありません';
translations.en['profile.noGallery'] = 'No images available';
translations.zh['profile.noGallery'] = '暫無圖片';
