const swup = new Swup({
  animateHistoryBrowsing: true,
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
            const navigation = document
              .getElementsByClassName("navigation-column")
              .item(0);
            const projectWrapper = document
              .getElementsByClassName("project-container")
              .item(0);
            const navigationWidth = navigation.offsetWidth;
            const navigationTargetPosition =
              (viewportWidth - navigationWidth) / 2;
            const next = document.querySelector("#project-controller");
            const prev = document.querySelector(
              "#project-controller + #project-controller"
            );
            await Promise.all([
              anime({
                targets: projectWrapper,
                translateX: ["50%", `0%`],
                easing: "spring(.7, 95, 13, 0)",
                complete: () => {
                  navigation.style.transform = "none";
                },
              }).finished,
              anime({
                targets: navigation,
                translateX: [`${navigationTargetPosition}px`, "0px"],
                easing: "spring(.7, 95, 13, 0)",
                complete: () => {
                  navigation.style.transform = "none";
                },
              }).finished,
              anime({
                targets: next,
                opacity: [0, 1],
                duration: 600,
              }).finished,
              anime({
                targets: prev,
                opacity: [1, 0],
                duration: 600,
              }).finished,
            ]);
          },
        },
        {
          from: "/project(.*)",
          to: "/",
          in: async () => {
            const viewportWidth = window.innerWidth;
            const navigation = document
              .getElementsByClassName("navigation-column")
              .item(0);
            const projectWrapper = document
              .getElementsByClassName("project-container")
              .item(0);
            const navigationWidth = navigation.offsetWidth;
            const navigationTargetPosition =
              (viewportWidth - navigationWidth) / 2;
            const next = document.querySelector("#project-controller");
            const prev = document.querySelector(
              "#project-controller + #project-controller"
            );
            await Promise.all([
              anime({
                targets: projectWrapper,
                translateX: ["0%", `50%`],
                easing: "spring(.7, 95, 13, 0)",
                complete: () => {
                  projectWrapper.style.transform = "translateX(50%)";
                },
              }).finished,
              anime({
                targets: navigation,
                translateX: ["0px", `${navigationTargetPosition}px`],
                easing: "spring(.7, 95, 13, 0)",
                complete: () => {
                  navigation.style.transform =
                    "translateX(-50%) translateX(50vw)";
                },
              }).finished,
              anime({
                targets: next,
                opacity: [0, 1],
                duration: 600,
              }).finished,
              anime({
                targets: prev,
                opacity: [1, 0],
                duration: 600,
              }).finished,
            ]);
          },
        },

        {
          from: "/project(.*)",
          to: "/project(.*)",
          in: async () => {
            const next = document.querySelector("#project-controller");
            const prev = document.querySelector(
              "#project-controller + #project-controller"
            );
            await Promise.all([
              anime({
                targets: next,
                opacity: {
                  value: [0, 1],
                  easing: "easeOutQuad",
                  duration: 250,
                },
                translateX: {
                  value: ["50%", "0%"],
                  easing: "spring(.7, 95, 13, 0)",
                },
              }).finished,
              anime({
                targets: prev,
                opacity: {
                  value: [1, 0],
                  easing: "easeOutQuad",
                  duration: 250,
                },
                translateX: {
                  value: ["0%", "50%"],
                  easing: "spring(.7, 95, 13, 0)",
                },
              }).finished,
            ]);
          },
        },
      ],
    }),
  ],
});


// Function to initialize the overlay functionality
function initializeOverlay() {
  const button = document.querySelector("#open-about");
  const closeButton = document.querySelector("#close-about");
  const closeButtonScrim = document.querySelector("#close-about-scrim");

  const overlay = document.querySelector(".about-overlay");
  const popover = document.querySelector(".about-popover");
  const firstFocusableElement = document.querySelector("#close-about"); // Adjust this to your first focusable element inside the modal

  function showOverlay() {
    overlay.style.display = "flex";

    anime({
      targets: ".about-overlay",
      opacity: [0, 1],
      duration: 225, 
      easing: "easeInQuad",
      before: function() {
        popover.style.transform = "translateY(-100%)";
      }
    });

    anime({
      targets: ".about-popover",
      scale: [0.5, 1],
      rotate: [0, -2],
      translateY: ["-100%", "0%"],
      easing: "spring(.7, 95, 13, 0)",
    });

    anime({
      targets: "#close-about",
      rotate: [12, 0],
      translateY: ["100%", "0%"],
      easing: "spring(.7, 95, 8, 0)",
    });

    // Add event listener for Esc key
    document.addEventListener("keydown", handleEscKey);

    // Trap focus inside modal
    overlay.setAttribute("aria-hidden", "false");
    overlay.setAttribute("tabindex", "-1");
    setTimeout(() => { // Timeout to ensure the overlay has been rendered
      firstFocusableElement.focus();
    }, 50);
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
      }
    });

    anime({
      targets: ".about-popover",
      scale: [1, 0.5],
      rotate: [-2, 0],
      translateY: ["0%", "-100%"],
      easing: "spring(.7, 95, 13, 0)",
    });

    anime({
      targets: "#close-about",
      rotate: [0, 12],
      translateY: ["0%", "125%"],
      easing: "spring(.7, 95, 8, 0)",
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
}

// Run once on initial page load
document.addEventListener("DOMContentLoaded", function () {
  initializeOverlay();
});

// Run whenever a new page is loaded with swup
swup.hooks.on('page:view', (visit) => {
  initializeOverlay();
});




function ScrollBarProgress() {
  const elmScroll = document.querySelector(".project-container").scrollTop;
  const sHeight = document.querySelector(".project-container").scrollHeight;
  const cHeight = document.querySelector(".project-container").clientHeight;
  const maxScroll = sHeight - cHeight; // Maximum scrollable distance
  const scrolled = (elmScroll / maxScroll) * 79.5; // Calculate percentage
  const clampedScrolled = Math.min(Math.max(scrolled, 0), 100); // Clamp the value between 0 and 100

  const progress = (document.querySelector(
    ".scroll-indicator"
  ).style.top = `calc(${clampedScrolled}% + 20px)`);
}

const elm = document.querySelector(".project-container");
elm.addEventListener("scroll", ScrollBarProgress);
