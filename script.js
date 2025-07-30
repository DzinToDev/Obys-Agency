function locomotive(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive()
function loadingAnimation() {
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrollTrigger)
  // CustomEase.create("our-ease","0.925, 0.5, 0, 1");

  // gsap.from(".line h1", {
  //     y: 100
  // })

  const textAnime = SplitText.create(".line h1", {
    type: "lines, words, chars",
  });

  const tl = gsap.timeline();

  tl.from(textAnime.lines, {
    yPercent: 200,
    stagger: 0.25,
    ease: "power2.out",
    duration: 0.5,
    delay: 0.5,
  });
  tl.to(
    ".counter-num",
    {
      opacity: 1,
      onStart: function () {
        const counterNum = document.querySelector(".counter-num h5");
        let grow = 0;

        const interval = setInterval(() => {
          counterNum.innerHTML = grow++;
          if (grow > 100) {
            clearInterval(interval); // Stop the timer
            // console.log("⛔ Counter stopped at", grow);
          }
        }, 45);
      },
      //   duration: 0.7,
    },
    "-=0.7"
  );
  tl.to("#line-3 h5", {
    animationName: "anime",
    opacity: 0,
  });

  tl.to(".wait-msg", {
    opacity: 1,
    duration: 0.7,
  });

  tl.to(".line h1, .counter-num, #line-3 h5, .wait-msg", {
    opacity: 0,
    duration: 0.6,
    delay: 3,
  });
  tl.to("#loader", {
    y: "-100%",
    duration: 0.3,
  });
  tl.from("#nav", {
    opacity:0
  })

  tl.from(".hero-text h1, #hero-text-3 span", {
    yPercent: 200,
    stagger: 0.25,
    ease: "power2.out",
    duration: 0.5,
    delay: 0.5,
  }, 'h');


  tl.from(".line-num01", {
    opacity: 0 ,
    duration: 0.5,
  },'h')
  tl.from(".video-container",{
    opacity:0,
    duration: 0.5
  })

  gsap.from(".heding-wrapper h1", {
    yPercent: 200,
    ease: "power2.out",
    duration: 0.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#page3",
      scroller:"#main",
      start: "top 98%",
      end: "top 90%"
    }
  },'p3')
  gsap.from("#num-p3", {
    opacity: 0 ,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page3",
      scroller:"#main",
      start: "top 99%",
      end: "top 90%",
    }
  },'p3')

}
loadingAnimation()

function cursor() {

Shery.makeMagnet(".nav-links-right h4, .left-logo-container #first-svg");

const crsr = document.querySelector(".crsr")
document.addEventListener("mousemove", function (e) {
  gsap.to(crsr, {
    left: e.clientX,
    top: e.clientY,
  });
});

const videoContainer = document.querySelector(".video-container");
const video = document.querySelector(".video-container video");
const imgVideo = document.querySelector(".video-container img");
const playFollower = document.querySelector(".play-follower");
let flag = 0
videoContainer.addEventListener("mouseenter", ()=> {
 videoContainer.addEventListener("mousemove", (e)=> {
  gsap.to(crsr, {
    scale:0,
    display: "none"
  })
  gsap.to(playFollower, {
    left: e.clientX - 450,
    top: e.clientY - 200,
  });
 })
})
videoContainer.addEventListener("mouseleave", ()=> {
  gsap.to(crsr, {
    scale:1,
    display: "block"
    
  })
  gsap.to(playFollower, {
    top: "-15%",
  left: "70%"
  })
})
videoContainer.addEventListener("click", ()=> {
  if(flag == 0){
  video.play()
  video.style.opacity = 1;
  playFollower.innerHTML = `<i class="ri-pause-mini-line"></i>`
  gsap.to(imgVideo, {
    opacity: 0,
  })
  gsap.to(playFollower, {
    scale: 0.7
  })
  flag = 1
}else {
  video.pause()
  video.style.opacity = 1;
  playFollower.innerHTML = `<i class="ri-play-large-fill"></i>`
  gsap.to(imgVideo, {
    opacity: 1,
  })
  gsap.to(playFollower, {
    scale: 1
  })
  flag = 0
}
})

}
cursor();



function sheryAnimation(){
  Shery.imageEffect(".img-div", {
    style:5,
    config:{"a":{"value":1.15,"range":[0,30]},"b":{"value":-0.94,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272667488697082},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.13,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.76,"range":[0,10]},"metaball":{"value":0.35,"range":[0,2],"_gsap":{"id":3}},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    gooey:true
  })
}
sheryAnimation()

function heroText3Hover(){
  const heroText3 = document.querySelector("#hero-text-3")
const flagHoverImg = document.querySelector("#flag-hover-img")
document.addEventListener("mousemove", (dets)=> {
  gsap.to(flagHoverImg, {
    x:dets.x,
    y:dets.y
  })
})

heroText3.addEventListener("mouseenter", ()=> {
  gsap.to(flagHoverImg, {
    opacity:1
  })
})
heroText3.addEventListener("mouseleave", ()=> {
  gsap.to(flagHoverImg, {
    opacity:0
  })
})
}
// heroText3Hover()

function footerLetsConnet(){
  const footerLetsconnecth1 = document.querySelector("#footerLetsConnect h1");

gsap.set(footerLetsconnecth1, { opacity: 1, visibility: "visible" });


$(footerLetsconnecth1).textillate({
  autoStart: false,
  in: { 
    effect: 'fadeIn',
    delayScale: 1.2,
    delay: 50,
    sync: false
  }
});

// Step 3: Run it once on page load to show text
$(footerLetsconnecth1).textillate('start');

const footerSvg = document.querySelector("#footerLetsConnect svg")

footerLetsconnecth1.addEventListener("mouseenter", () => {
  footerLetsconnecth1.style.fontStyle = "italic";
  footerLetsconnecth1.style.webkitTextStroke = "0.5px #ffffff";
  footerLetsconnecth1.style.color = "transparent";
  footerLetsconnecth1.style.webkitTextFillColor = "transparent";
  footerLetsconnecth1.style.fontWeight = "600";
  footerSvg.style.marginLeft = "5%"

  // Re-run textillate effect
  $(footerLetsconnecth1).textillate('in');
});


footerLetsconnecth1.addEventListener("mouseleave", () => {
  footerLetsconnecth1.style.fontStyle = "normal";
  footerLetsconnecth1.style.webkitTextStroke = "0px transparent";
  footerLetsconnecth1.style.color = "#ffffff";
  footerLetsconnecth1.style.webkitTextFillColor = "#ffffff";
  footerLetsconnecth1.style.fontWeight = "900";
  footerSvg.style.marginLeft = "0%"


  // Re-run textillate effect again
  $(footerLetsconnecth1).textillate('in');
});

}

footerLetsConnet()