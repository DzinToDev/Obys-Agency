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
