
// navbar sticky
window.addEventListener("scroll", function () {
  var nav = document.getElementById('nav2');
  nav.classList.toggle("fixed-top", window.scrollY > 0);
  nav.classList.toggle("sticky", window.scrollY > 0);
  var navtwo = document.getElementById('responsivenavbar')
  navtwo.classList.toggle("fixed-top", window.scrollY > 0)
  navtwo.classList.toggle("sticky", window.scrollY > 0);
});

// header
document.addEventListener("DOMContentLoaded", () => {
  new Glide(".glide", {
    type: "carousel",
    startAt: 0,
    animationTimingFunc: "ease-in-out",
    gap: 100,
    perView: 3
  }).mount();

  let prevBtn = document.getElementById("prev");
  let nextBtn = document.getElementById("next");

  let background = document.querySelector(".background");
  let indices = document.querySelectorAll(".index");

  let bgImgs = ["headerbackgroundone.jpg", "headerbackgroundtwo.jpg", "headerbackgroundthree.jpg", "headerbackgroundfour.jpg"];

  let currentIndex = 0;

  indices.forEach(index => index.classList.remove("active"));
  indices[currentIndex].classList.add("active");

  var myAnimation = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `image/${bgImgs[0]}`,
    image2: `image/${bgImgs[1]}`,
    displacementImage: "image/14.jpg",
    hover: false
  });

  var myAnimation2 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `image/${bgImgs[1]}`,
    image2: `image/${bgImgs[2]}`,
    displacementImage: "image/14.jpg",
    hover: false
  });

  var myAnimation3 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `image/${bgImgs[2]}`,
    image2: `image/${bgImgs[3]}`,
    displacementImage: "image/14.jpg",
    hover: false
  });

  var myAnimation4 = new hoverEffect({
    parent: document.querySelector(".background"),
    intensity: 0.3,
    imagesRatio: 1080 / 1920,
    image1: `image/${bgImgs[3]}`,
    image2: `image/${bgImgs[0]}`,
    displacementImage: "image/14.jpg",
    hover: false
  });

  let distortAnimations = [
    myAnimation,
    myAnimation2,
    myAnimation3,
    myAnimation4
  ];

  function startNextDistortAnimation() {
    let prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % 4;
    indices.forEach(index => index.classList.remove("active"));
    indices[currentIndex].classList.add("active");
    distortAnimations[prevIndex].next();
    showTextAnimation("next");
    setTimeout(() => {
      let canvas = background.querySelectorAll("canvas");
      background.appendChild(canvas[0]);
      distortAnimations[prevIndex].previous();
    }, 1200);
  }

  function startPrevDistortAnimation() {
    currentIndex = currentIndex - 1 < 0 ? 3 : currentIndex - 1;
    indices.forEach(index => index.classList.remove("active"));
    indices[currentIndex].classList.add("active");
    distortAnimations[currentIndex].next();
    showTextAnimation("prev");
    setTimeout(() => {
      let canvas = background.querySelectorAll("canvas");
      background.insertBefore(canvas[canvas.length - 1], background.firstChild);
      distortAnimations[currentIndex].previous();
    }, 500);
  }

  nextBtn.addEventListener("click", () => {
    startNextDistortAnimation();
  });

  prevBtn.addEventListener("click", () => {
    startPrevDistortAnimation();
  });

  let titleDisplacement = 0;
  let descriptionDisplacement = 0;

  function showTextAnimation(direction) {
    if (titleDisplacement === 0 && direction === "prev") {
      titleDisplacement = -300;
    } else if (titleDisplacement === -300 && direction === "next") {
      titleDisplacement = 0;
    } else {
      titleDisplacement =
        direction === "next"
          ? titleDisplacement - 100
          : titleDisplacement + 100;
    }

    if (descriptionDisplacement === 0 && direction === "prev") {
      descriptionDisplacement = -390;
    } 
    else if(descriptionDisplacement === -390 && direction === "next"){
      descriptionDisplacement = 0;
    }
    else {
      descriptionDisplacement =
        direction === "next" 
          ? descriptionDisplacement - 130
          : descriptionDisplacement + 130;
    }

    let title = document.querySelectorAll("#title h4");
    let description = document.querySelectorAll("#description p");

    title.forEach(title => {
      TweenMax.to(title, 1, {
        top: `${titleDisplacement}%`,
        ease: Strong.easeInOut
      });
    });

    description.forEach((description, index) => {
      let opacity = 0;
      if(index === currentIndex){
        opacity = 1;
      }else {
        opacity = 0;
      }
      TweenMax.to(description, 1, {
        top: `${descriptionDisplacement}%`,
        ease: Strong.easeInOut,
        opacity: opacity
      });
    })
  }
});


// header end

// // loading screen
// setTimeout(function(){
//   $('.loading-wraper').css("display","none");
//   $('#loader').css("overflow","auto");
// }, 6500);


window.onload = function () {
  $('.carousel-item').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });
};



(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from'),
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals: $(this).data('decimals')
      }, options);

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof (settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof (settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  // start all the timers
  $('.timer').each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});


// swiper
var swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});



let test = document.getElementById("icons-sec-five");
let containerone = document.getElementById("img-sec-three");
let testtwo = document.getElementById("icons-sec-five-two");
let containertwo = document.getElementById("section-five-two");
let testthree = document.getElementById("icons-sec-five-three");
let containerthree = document.getElementById("section-five-three");
let testfour = document.getElementById("icons-sec-five-four");
let containerfour = document.getElementById("section-five-four");




// This handler will be executed only once when the cursor
// moves over the unordered list
containerone.addEventListener('mouseenter', function () {
  test.style.display = 'block';
  test.style.transform = 'translateX(-20px)';
})

containerone.addEventListener('mouseleave', function () {
  test.style.display = 'none';
  test.style.transform = 'translateX(40px)';
})



// This handler will be executed only once when the cursor
// moves over the unordered list
containertwo.addEventListener('mouseenter', function () {
  testtwo.style.display = 'block';
  testtwo.style.transform = 'translateX(-20px)';
})

containertwo.addEventListener('mouseleave', function () {
  testtwo.style.display = 'none';
  testtwo.style.transform = 'translateX(40px)';
})



// This handler will be executed only once when the cursor
// moves over the unordered list
containerthree.addEventListener('mouseenter', function () {
  testthree.style.display = 'block';
  testthree.style.transform = 'translateX(-20px)';
})

containerthree.addEventListener('mouseleave', function () {
  testthree.style.display = 'none';
  testthree.style.transform = 'translateX(40px)';
})



// This handler will be executed only once when the cursor
// moves over the unordered list
containerfour.addEventListener('mouseenter', function () {
  testfour.style.display = 'block';
  testfour.style.transform = 'translateX(-20px)';
})

containerfour.addEventListener('mouseleave', function () {
  testfour.style.display = 'none';
  testfour.style.transform = 'translateX(40px)';
})


$(".forhover").mouseenter(function(){
  $("#hoverone").css("background-color","rgb(218, 181, 112)").css("transition","0.4s")
  $(".buttonone").css("background-color","black").css("transition","0.4s")
  $(".buttonone").css("color","white").css("transition","0.4s")
});
$(".forhover").mouseleave(function(){
  $("#hoverone").css("background-color","");
  $(".buttonone").css("background-color","")
  $(".buttonone").css("color","")
});

$(".forhovertwo").mouseenter(function(){
  $("#hovertwo").css("background-color","rgb(218, 181, 112)").css("transition","0.4s")
  $(".buttontwo").css("background-color","black").css("transition","0.4s")
  $(".buttontwo").css("color","white").css("transition","0.4s")
});
$(".forhovertwo").mouseleave(function(){
  $("#hovertwo").css("background-color","");
  $(".buttontwo").css("background-color","")
  $(".buttontwo").css("color","")
});


$(".forhoverthree").mouseenter(function(){
  $("#hoverthree").css("background-color","rgb(218, 181, 112)").css("transition","0.4s")
  $(".buttonthree").css("background-color","black").css("transition","0.4s")
  $(".buttonthree").css("color","white").css("transition","0.4s")
});
$(".forhoverthree").mouseleave(function(){
  $("#hoverthree").css("background-color","");
  $(".buttonthree").css("background-color","")
  $(".buttonthree").css("color","")
});


$(".forhoverfour").mouseenter(function(){
  $("#hoverfour").css("background-color","rgb(218, 181, 112)").css("transition","0.4s")
  $(".buttonfour").css("background-color","black").css("transition","0.4s")
  $(".buttonfour").css("color","white").css("transition","0.4s")
});
$(".forhoverfour").mouseleave(function(){
  $("#hoverfour").css("background-color","");
  $(".buttonfour").css("background-color","")
  $(".buttonfour").css("color","")
});

// section seven
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
