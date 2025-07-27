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
            console.log("⛔ Counter stopped at", grow);
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

}
loadingAnimation()

function cursor() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".crsr", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet(".nav-links-right h4, .left-logo-container #first-svg");
}
cursor();
