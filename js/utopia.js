'use strict'

{
    // dropdown-menu
    document.addEventListener("DOMContentLoaded", function () {

        const dropDowns = document.querySelectorAll('.dropdown');

        for (let i = 0; i < dropDowns.length; i++) {
            dropDowns[i].addEventListener('mouseover', function() {
                this.querySelectorAll('.dropdown-menu')[0].style.display = 'block';
            });

            dropDowns[i].addEventListener('mouseout', function() {
                this.querySelectorAll('.dropdown-menu')[0].style.display = 'none';
            });
        }
    
         //hamburger-menu 
         const hamburgerIcon = document.querySelector('.hamburger-menu-icon');
         const parallelNav = document.querySelector('.parallel-nav');
         const content = document.querySelector('#content');


        hamburgerIcon.addEventListener("click", function(event) {
            this.classList.toggle("active");
            parallelNav.classList.toggle("panelactive");
            content.classList.toggle("mainblur");
        });
    });

    // slideshow
    //ページのURLを取得
    document.addEventListener("DOMContentLoaded", function() {
        const currentPage = window.location.pathname;

    if (currentPage.endsWith("/index.html")) {
        console.log("indexページもOK");
            const slides = document.querySelectorAll(".slide");
            let currentSlide = 0;

            function showSlide(index) {
                slides[currentSlide].classList.remove("active");
                currentSlide = (index + slides.length) % slides.length;
                slides[currentSlide].classList.add("active");
            }

            function nextSlide() {
                showSlide(currentSlide + 1); 
            }

            setInterval(nextSlide, 6000);
    }

    //swiper-thumbs
    if (currentPage === '/accommodation.html') {
        const mainSlider = new Swiper('.swiper-container', {
            slidesPerView: 1,
            loop: false,
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            on: {
                slideChange: function () {
                    let currentIndex = this.realIndex;
                    updateThumbOpacity(currentIndex);
                },
            },
        });

        const thumbsSlider = new Swiper('.thumbs-container', {
            slidesPerView: 7,
            spaceBetween: 16,
            centeredSlides: true,
            slidesPerGroup: 1,
            direction: 'horizontal',
            loop: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 5,
                },
            },
            on: {
                slideChange: function () {
                    let currentIndex = mainSlider.realIndex;
                    updateThumbOpacity(currentIndex);
                },
            },
        });

        const swiperButton = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });

        // Swiperのスライド変更時の処理
        mainSlider.on('slideChange', function () {
            let currentIndex = mainSlider.realIndex;
            updateThumbOpacity(currentIndex);
        });

        // thumbクリック時のスライド切り替え関数
        function onThumbClick(index) {
            mainSlider.slideTo(index);
            updateThumbOpacity(index);
        }

        // thumb-slideクリック時の処理
        document.querySelectorAll('.thumb-slide').forEach(function (thumb, index) {
            thumb.addEventListener('click', function () {
                onThumbClick(index);
            });
        });

        // Swiperの初期スライドでthumbのopacityを設定
        function updateThumbOpacity(index) {
            document.querySelectorAll('.thumb-slide').forEach(function (thumb) {
                thumb.style.opacity = 0.6;
            });

            document.querySelector('.thumb-slide:nth-child(' + (index + 1) + ')').style.opacity = 1;
        }
        updateThumbOpacity(0);
    }

    //gallery
    if (currentPage === "/photos.html") {

        const grid = new Muuri('.grid', {
            items: '.item',
            layout: {
                fillGaps: true,
                layoutDuration: 600,
                layouteasing: 'ease',
                dragEnabled: false,
            }
        });

        const sortButtons = document.querySelectorAll('.sort-btn li');

        sortButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                sortButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                const className = button.classList[0];
        
                if (className === 'sort-all') {
                    grid.filter('.item');
                } else {
                    grid.filter('.' + className);
                }
            });
        });

        const lightbox = GLightbox({
            selector: 'a[data-gallery]',
            touchNavigation: true,
            loop: true,
        });

       grid.layout();
    }  
    });
}
