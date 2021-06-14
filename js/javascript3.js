// navbar sticky
window.addEventListener("scroll", function () {
  var nav = document.getElementById('nav2');
  nav.classList.toggle("fixed-top", window.scrollY > 0);
  var navtwo = document.getElementById('responsivenavbar')
  navtwo.classList.toggle("fixed-top", window.scrollY > 0);
});



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
                  
  
  
  
  
  
  
  
  
  
  
  
  