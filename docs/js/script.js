$(document).ready(function () {
    // 새로고침 시 맨 위로 이동
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  
    // 이미지 슬라이드
    let slideIndex = 0;
    const slides = $("#slides img");
    const totalSlides = slides.length;
  
    for (let i = 0; i < totalSlides; i++) {
      $("#indicators").append("<span></span>");
    }
    $("#indicators span").eq(0).addClass("active");
  
    function slideShow(index) {
      const slideWidth = $("#slider").width();
      $("#slides").css("transform", `translateX(${-slideWidth * index}px)`);
      $("#indicators span").removeClass("active").eq(index).addClass("active");
    }
  
    $("#indicators span").click(function () {
      slideIndex = $(this).index();
      slideShow(slideIndex);
    });
  
    let autoSlide = setInterval(function () {
      slideIndex = (slideIndex + 1) % totalSlides;
      slideShow(slideIndex);
    }, 10000);
  
    $("#slider").hover(
      function () {
        clearInterval(autoSlide);
      },
      function () {
        autoSlide = setInterval(function () {
          slideIndex = (slideIndex + 1) % totalSlides;
          slideShow(slideIndex);
        }, 5000);
      }
    );


    // 후기 콘테츠 슬라이드
    let cttSlideIndex = 0;
    const laterWidth = $("#later li").outerWidth(true);
    const laterMargin = parseInt($("#later li").css("margin-right"));
    const laterToShow = 4;
    const totalLaters = $("#later li").length;
    const maxcttIndex = Math.ceil(totalLaters / laterToShow);

    function cttShow () {
        let moveDistance = (laterWidth + laterMargin) * laterToShow * cttSlideIndex;

        $("#later").css("transform", `translateX(${-moveDistance}px)`);

        if(cttSlideIndex >= maxcttIndex - 1) {
            setTimeout(function () {
                $("#later").css("transition", "none");
                cttSlideIndex = 0;
                $("#later").css("transform", `translateX(0)`);
            }, 900);
        } else {
            $("#later").css("transition", "transform 0.8s ease-in-out");
        }
    }

    let autoCttSlide = setInterval(function () {
        cttSlideIndex++;
        cttShow();
    }, 8000);
    
    $("#later").hover(
        function () {
            clearInterval(autoCttSlide);
        },
        function () {
            autoCttSlide = setInterval(function () {
                cttSlideIndex++;
                cttShow();
            }, 8000);
        }
    );

    cttShow();
});