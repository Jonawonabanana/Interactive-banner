document.addEventListener('DOMContentLoaded', function () {
    const cut1_layout = document.getElementById('cut1_layout');
    const cut1_video = document.getElementById('cut1_video');
    const introVideo = document.getElementById('introVideo');
    const cut1_logo = document.querySelector('.cut1logo');
    const cut1_logo_end = document.getElementById('cut1_logo_end');
    const interactiveScreen = document.getElementById('interactiveScreen');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const carouselIntervalTime = 3000; // 每個輪播項目的展示時間 (毫秒)
    const videoStopTime = 30000; // 互動畫面播放時間為30秒 (30000毫秒)

    // Step 1: 頁面載入後顯示cut1_bg並淡入logo
    setTimeout(() => {
        cut1_logo.style.opacity = 1; // 將透明度從0變為1，實現淡入效果
    }, 500); // 0.5秒延遲後開始淡入

    // Step 2: 顯示並播放影片
    setTimeout(() => {
        cut1_layout.style.display = 'none'; // 隱藏背景和logo
        cut1_video.classList.add('active'); // 顯示影片區域
        introVideo.play(); // 播放影片
    }, 3000); // 3秒延遲後顯示並播放影片

    // 影片結束後顯示cut1_logo_end.png
    introVideo.onended = () => {
        cut1_video.classList.remove('active');
        cut1_logo_end.classList.add('active');

        // 1秒後顯示互動輪播
        setTimeout(() => {
            cut1_logo_end.classList.remove('active');
            interactiveScreen.classList.add('active');
            startCarousel();
        }, 1000);
    };

    // 點擊外連後影片暫停
    document.querySelectorAll('.clickable').forEach(item => {
        item.addEventListener('click', () => {
            introVideo.pause();
            window.open(item.dataset.link, '_blank');
        });
    });

    // 音量控制按鈕
    let isMuted = true;
    volumeControl.addEventListener('click', () => {
        isMuted = !isMuted;
        introVideo.muted = isMuted;
        volumeControl.textContent = isMuted ? '🔇' : '🔊';
    });



    // 開始輪播
    function startCarousel() {
        carouselItems[currentIndex].classList.add('active');
        const carouselInterval = setInterval(() => {
            carouselItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % carouselItems.length;
            carouselItems[currentIndex].classList.add('active');
        }, carouselIntervalTime);

        setTimeout(() => {
            clearInterval(carouselInterval);
        }, videoStopTime);
    }
});
