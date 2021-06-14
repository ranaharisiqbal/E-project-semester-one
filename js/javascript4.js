// navbar sticky
window.addEventListener("scroll", function () {
    var nav = document.getElementById('nav2');
    nav.classList.toggle("fixed-top", window.scrollY > 0);
    var navtwo = document.getElementById('responsivenavbar')
    navtwo.classList.toggle("fixed-top", window.scrollY > 0);
  });
  
  
  
  $("#bg-img").mouseenter(function(){
      $(".heading-1").css("display","block").css("transition","0.4s");
      $(".image").css("display","block").css("transition","0.4s");
      $(".txt").css("display","block").css("transition","0.4s");
  
  });
  $("#bg-img").mouseleave(function(){
      $(".heading-1").css("display","none");
      $(".image").css("display","none");
      $(".txt").css("display","none");
  });
  $("#bg-img-2").mouseenter(function(){
      $(".heading-3").css("display","block").css("transition","0.4s");
      $(".image-3").css("display","block").css("transition","0.4s");
      $(".txt-3").css("display","block").css("transition","0.4s");
  
  });
  $("#bg-img-2").mouseleave(function(){
      $(".heading-3").css("display","none");
      $(".image-3").css("display","none");
      $(".txt-3").css("display","none");
  });
  $("#bg-img-3").mouseenter(function(){
      $(".heading-5").css("display","block").css("transition","0.4s");
      $(".image-5").css("display","block").css("transition","0.4s");
      $(".txt-5").css("display","block").css("transition","0.4s");
  
  });
  $("#bg-img-3").mouseleave(function(){
      $(".heading-5").css("display","none");
      $(".image-5").css("display","none");
      $(".txt-5").css("display","none");
  });
  // -------------------------for slider-----------------------//
  $('.slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay:true,
      arrows:false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite:true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite:true
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  
  