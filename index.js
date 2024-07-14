// Detect if "reduce motion" preference is enabled
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// 👨‍🏫👨‍🏫 Creates a global "navigation width variable that always has a functional number to animate to/from. 👨‍🏫👨‍🏫 //

let navigationWidth;
const updateNavigationWidth = () => {
  const navigation = document.getElementsByClassName("navigation-column").item(0);
  if (navigation) {
    navigationWidth = navigation.offsetWidth;
  }
};

// 👨‍🏫👨‍🏫 Creates a global variable for the scroll position of the navigation column and  a command to restore it. Usage is at end of swup code for storage and in mobile project -> home "before" animation code. 👨‍🏫👨‍🏫 //

let navigationScrollTop = 0;

function storeScrollPosition() {
  const siteWrapper = document.querySelector(".site-wrapper");
  if (siteWrapper) {
    navigationScrollTop = siteWrapper.scrollTop;
  }
}

function restoreScrollPosition() {
  const siteWrapper = document.querySelector(".site-wrapper");
  if (siteWrapper) {
    siteWrapper.scrollTop = navigationScrollTop;
  }
}

// 👨‍🏫👨‍🏫 Constantly updates the navigationWidth variable whenever the user resizes their browser window. 👨‍🏫👨‍🏫 //

updateNavigationWidth();
window.addEventListener('resize', updateNavigationWidth);


// 👨‍🏫👨‍🏫 Initializes Swup.JS, the plugin used to handle the page transition animations. Also uses Anime.JS to allow for spring animations. 👨‍🏫👨‍🏫 //

if (!prefersReducedMotion) {
  const swup = new Swup({
  animateHistoryBrowsing: true,
  respectReducedMotion: false,
  containers: ["#project-controller", "#navigation-controller"],
  plugins: [
    new SwupA11yPlugin(),
    new SwupParallelPlugin({ containers: ["#project-controller"] }),
    new SwupJsPlugin({
      animations: [
        {
          from: "/",
          to: "/project(.*)",
          in: async () => {

            const viewportWidth = window.innerWidth;
            const navigation = document.getElementsByClassName("navigation-column").item(0);
            const projectWrapper = document.getElementsByClassName("project-container").item(0);
            const navigationTargetPosition = (viewportWidth - navigationWidth) / 2;
            const mobileNavButton = document.querySelector(".mobile-back-button"); 
            const mobileNavigationTarget = (navigationWidth + navigationTargetPosition);
            const next = document.querySelector("#project-controller");
            const prev = document.querySelector("#project-controller + #project-controller");
            const scrim = document.querySelector("#active");

            if (viewportWidth <= 991) {

            //  FROM HOME TO PROJECT
            //  MOBILE

              await Promise.all([
                anime({
                  targets: navigation,
                  before: () => {
                    navigation.style.display = "flex";
                    navigation.style.width = `${navigationWidth}px`;
                    projectWrapper.style.position = "fixed";
                  },
                  translateX: [`${navigationTargetPosition}px`, `-${mobileNavigationTarget}px`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    navigation.style.transform = "none";
                    navigation.style.display = "";
                    navigation.style.width = "";
                    projectWrapper.style.position = "";
                    

                  },
                }).finished,
                anime({
                  targets: projectWrapper,
                  translateX: [`${mobileNavigationTarget}px`, `0px`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    projectWrapper.style.transform = "none";
                  },
                }).finished,
                anime({
                  targets: next,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: prev,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 200,
                }).finished,
                anime({
                  targets: scrim,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 150,
                }).finished,
                anime({
                  targets: mobileNavButton,
                  rotate: [12, 0],
                  translateY: ["150%", "0%"],
                  easing: "spring(.7, 95, 8, 0)",
                  before: () => {
                    mobileNavButton.style.display = "flex";
                  },
                }).finished,
              ]);
            } else {

            //  FROM HOME TO PROJECT
            //  WEB

              await Promise.all([
                anime({
                  targets: navigation,
                  translateX: [`${navigationTargetPosition}px`, "0px"],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    navigation.style.transform = "none";
                  },
                }).finished,
                anime({
                  targets: projectWrapper,
                  translateX: ["50%", `0%`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    projectWrapper.style.transform = "none";
                  },
                }).finished,
                anime({
                  targets: next,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: prev,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 200,
                }).finished,
                anime({
                  targets: scrim,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 150,
                }).finished,
                anime({
                  targets: mobileNavButton,
                  rotate: [12, 0],
                  translateY: ["150%", "0%"],
                  easing: "spring(.7, 95, 8, 0)",
                  before: () => {
                    mobileNavButton.style.display = "flex";
                  },
                }).finished,
              ]);
            }
          }
        },
        {
          from: "/project(.*)",
          to: "/",
          in: async () => {
            
            const viewportWidth = window.innerWidth;
            const navigation = document.getElementsByClassName("navigation-column").item(0);
            const localNavigationWidth = navigation.offsetWidth;
            const projectWrapper = document.getElementsByClassName("project-container").item(0);
            const navigationTargetPosition = (viewportWidth - localNavigationWidth) / 2;
            const mobileNavButton = document.querySelector(".mobile-back-button"); 
            const mobileNavigationTarget = (localNavigationWidth + navigationTargetPosition);
            const next = document.querySelector("#project-controller");
            const prev = document.querySelector("#project-controller + #project-controller");
            const scrim = document.querySelector("#active");

            if (viewportWidth <= 991) {
            //  FROM PROJECT TO HOME
            //  MOBILE
            
              await Promise.all([
                anime({
                  targets: navigation,
                  before: () => {
                    projectWrapper.style.position = "fixed";
                    navigation.style.width = `${localNavigationWidth}px`;
                    restoreScrollPosition();
                    
                  },
                  translateX: [`-${mobileNavigationTarget}px`, `${navigationTargetPosition}px`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    navigation.style.transform = "translateX(-50%) translateX(50vw)";
                    projectWrapper.style.position = "";
                    navigation.style.display = "";
                    navigation.style.width = "";
                  },
                }).finished,
                anime({
                  targets: projectWrapper,
                  translateX: ["0px", `${mobileNavigationTarget}px`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    projectWrapper.style.transform = "translateX(calc(-40% + 60vw))";
                  },
                }).finished,
                anime({
                  targets: next,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: prev,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 200,
                }).finished,
                anime({
                  targets: scrim,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: mobileNavButton,
                  rotate: [0, 12],
                  translateY: ["0%", "150%"],
                  easing: "spring(.7, 95, 8, 0)",
                  before: () => {
                    mobileNavButton.style.display = "flex";
                  },
                  complete: () => {
                    mobileNavButton.style.display = "";
                  },
                }).finished,
              ]);
            } else {
              await Promise.all([

            //  FROM PROJECT TO HOME
            //  WEB

                anime({
                  targets: navigation,
                  translateX: ["0px", `${navigationTargetPosition}px`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    navigation.style.transform = "translateX(-50%) translateX(50vw)";
                  },
                }).finished,
                anime({
                  targets: projectWrapper,
                  translateX: ["0%", `50%`],
                  easing: "spring(1, 93, 15, 5)",
                  complete: () => {
                    projectWrapper.style.transform = "translateX(50%)";
                  },
                }).finished,
                anime({
                  targets: next,
                  opacity: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: prev,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 200,
                }).finished,
                anime({
                  targets: scrim,
                  opacity: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 250,
                }).finished,
                anime({
                  targets: mobileNavButton,
                  rotate: [0, 12],
                  translateY: ["0%", "150%"],
                  easing: "spring(.7, 95, 8, 0)",
                  before: () => {
                    mobileNavButton.style.display = "none";
                  },
                }).finished,
              ]);
            }
          }
        },

        {
          from: "/project(.*)",
          to: "/project(.*)",
          in: async () => {

            const next = document.querySelector("#project-controller");
            const prev = document.querySelector("#project-controller + #project-controller");
            const scrim = document.querySelector("#active");

            await Promise.all([
              anime({
                targets: next,
                opacity: {
                  value: [0, 1],
                  easing:"easeInOutQuad",
                  duration: 250,
                },
                translateX: {
                  value: ["75%", "0%"],
                  easing: "spring(1, 93, 16, 5)",
                },
              }).finished,
              anime({
                targets: prev,
                opacity: {
                  value: [1, 0],
                  easing:"easeInOutQuad",
                  duration: 200,
                },
                translateX: {
                  value: ["0%", "75%"],
                  easing: "spring(1, 93, 16, 5)",
                },
              }).finished,
              anime({
                targets: scrim,
                opacity: [0, 1],
                easing:"easeInOutQuad",
                duration: 250,
              }).finished,
            ]);
          },
        },
      ],
    }),
  ],
});

// 👨‍🏫👨‍🏫 Hover gradient for .project-cards 👨‍🏫👨‍🏫 //

document.addEventListener('DOMContentLoaded', function() {
  // Function to initialize hover animation
  function initializeHoverAnimation() {
      var projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(function(card) {
          var hoverGradient = card.querySelector('.hover-gradient');
          
          // Anime.js hover animation setup
          card.addEventListener('mouseenter', function() {
              anime({
                  targets: hoverGradient,
                  opacity: 1,
                  duration: 300, // Animation duration in milliseconds
                  easing: 'easeOutQuad' // Easing function
              });
          });
          
          card.addEventListener('mouseleave', function() {
              anime({
                  targets: hoverGradient,
                  opacity: 0,
                  duration: 300,
                  easing: 'easeOutQuad'
              });
          });
      });
  }
 

// 👨‍🏫👨‍🏫 This forces webflow interactions to refresh each time the page loads so they continue to work. 👨‍🏫👨‍🏫 //
  function reinitializeWebflowInteractions() {
    Webflow.destroy();
    Webflow.ready();
    window.Webflow?.require('ix2').init();
  }

  // Initialize on page load
  initializeHoverAnimation();
  reinitializeWebflowInteractions();

  // Reinitialize on swup.js page transition
  swup.hooks.on('page:view', () => {
      initializeHoverAnimation();
      reinitializeWebflowInteractions();
  });
});

// 👨‍🏫👨‍🏫 After a 100 millisecond delay, this code forces an update of the navigationWidth variable at the top of my code. This is to fix the corner case where the user refreshes or starts from sub-page where the width is technically 0. 👨‍🏫👨‍🏫 //

swup.hooks.on('page:view', () => {
  setTimeout(() => {
    updateNavigationWidth();
  }, 100);
});

// 👨‍🏫👨‍🏫 This initializes the "About Me" overlay when using swup for page transitions. Backup init is below. It also initializes the hover animation 👨‍🏫👨‍🏫 //

swup.hooks.on('page:view', (visit) => {
  initializeOverlay();
});

// 👨‍🏫👨‍🏫 This captures the scroll position for the "site-wrapper" when navigating from home to project. Scroll position restore happens in "before" of mobile Project -> Home 👨‍🏫👨‍🏫 //

swup.hooks.on('visit:start', (visit) => {
  const fromHomeToProject = visit.from.url === '/' && /\/project/.test(visit.to.url);

  if (fromHomeToProject) {
    storeScrollPosition();
  }
});


}



// 👨‍🏫👨‍🏫 This makes the "About Me" overlay functional. Without this code, about me cannot work. It also includes some accessibilty improvements so the browser focus is hopefully more usable. 👨‍🏫👨‍🏫  // 

function initializeOverlay() {
  const button = document.querySelector("#open-about");
  const closeButton = document.querySelector("#close-about");
  const closeButtonScrim = document.querySelector("#close-about-scrim");
  const overlay = document.querySelector(".about-overlay");
  const popover = document.querySelector(".about-popover");
  const firstFocusableElement = document.querySelector("#close-about"); // Adjust this to your first focusable element inside the modal

  function getViewportWidth() {
    return window.innerWidth;
  }

  function applyPopoverRotation() {
    const viewportWidth = getViewportWidth();
    if (viewportWidth <= 479) {
      popover.style.transform = popover.style.transform.replace(/rotate\([^)]+\)/, "rotate(0deg)");
    } else {
      popover.style.transform = popover.style.transform.replace(/rotate\([^)]+\)/, "rotate(-2deg)");
    }
  }

  function showOverlay() {
    overlay.style.display = "flex";

    anime({
      targets: ".about-overlay",
      opacity: [0, 1],
      duration: 225, 
      easing: "easeInQuad",
      before: function() {
        popover.style.transform = "translateY(-100%)";
        applyPopoverRotation(); // Apply initial rotation based on viewport width
        
      }
    });

    if (getViewportWidth() <= 479) {
      anime({
        targets: ".about-popover",
        scale: [0.5, 1],
        translateY: ["-100%", "0%"],
        easing: "spring(1, 95, 13, 0)",
      });
    } else {
      anime({
        targets: ".about-popover",
        scale: [0.5, 1],
        rotate: [0, -2],
        translateY: ["-100%", "0%"],
        easing: "spring(1, 95, 13, 0)",
      });
    }

    anime({

      targets: "#close-about",
      rotate: [12, 0],
      translateY: ["200%", "0%"],
      easing: "spring(1, 95, 8, 0)",
      complete: function() {
        setTimeout(() => { // Timeout to ensure the overlay has been rendered
          firstFocusableElement.focus();
        }, 50);
      }
    });

    // Add event listener for Esc key
    document.addEventListener("keydown", handleEscKey);

    // Trap focus inside modal
    overlay.setAttribute("aria-hidden", "false");
    overlay.setAttribute("tabindex", "-1");

  }

  function hideOverlay() {
    anime({
      targets: ".about-overlay",
      opacity: [1, 0],
      duration: 225, 
      easing: "easeInQuad",
      complete: function() {
        overlay.style.display = "none";
        // Reset focus to the button that opened the modal
        button.focus();
        closeButton.style.transform = "translateY(0%) rotate(0deg)";
      }
    });
  
    if (getViewportWidth() <= 479) {
      anime({
        targets: ".about-popover",
        scale: [1, 0.5],
        translateY: ["0%", "-100%"],
        easing: "spring(1, 95, 13, 0)",
      });
    } else {
      anime({
        targets: ".about-popover",
        scale: [1, 0.5],
        rotate: [-2, 0],
        translateY: ["0%", "-100%"],
        easing: "spring(1, 95, 13, 0)",
      });
    }
    anime({
      targets: "#close-about",
      rotate: [0, 12],
      translateY: ["0%", "20%"],
      easing: "spring(1, 95, 8, 0)",
    });

    // Remove event listener for Esc key
    document.removeEventListener("keydown", handleEscKey);

    // Untrap focus from modal
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("tabindex");
  }

  function handleEscKey(event) {
    if (event.key === "Escape") {
      hideOverlay();
    }
  }

  function handleResize() {
    if (overlay.style.display === "flex") {
      applyPopoverRotation();
    }
  }

  // Add event listeners for close actions
  button.addEventListener("click", showOverlay);
  closeButton.addEventListener("click", hideOverlay);
  closeButtonScrim.addEventListener("click", hideOverlay);
  popover.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  // Manage tab key behavior within modal
  overlay.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
      const focusableElements = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  });

  // Add event listener for window resize to adjust rotation in real-time
  window.addEventListener("resize", handleResize);
}

// Run once on initial page load
document.addEventListener("DOMContentLoaded", function () {
  initializeOverlay();
});


// 👨‍🏫👨‍🏫 This drives the little orange reading progress dot on open projects. 👨‍🏫👨‍🏫 // 

function ScrollBarProgress() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    const elmScroll = document.querySelector(".project-container").scrollTop;
    const sHeight = document.querySelector(".project-container").scrollHeight;
    const cHeight = document.querySelector(".project-container").clientHeight;
    const maxScroll = sHeight - cHeight; // Maximum scrollable distance
    const scrolled = (elmScroll / maxScroll) * 79.5; // Calculate percentage
    const clampedScrolled = Math.min(Math.max(scrolled, 0), 100); // Clamp the value between 0 and 100

    scrollIndicator.style.top = `calc(${clampedScrolled}% + 20px)`;
  }
}

const elm = document.querySelector(".project-container");
elm.addEventListener("scroll", ScrollBarProgress);