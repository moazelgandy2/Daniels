// Select all navigation links
const navLinks = document.querySelectorAll("nav ul li a");

// Select the logo element
const logo = document.getElementById("logo");

// Select all sections
const sections = document.querySelectorAll("section");

// Select the about section
const aboutSection = document.getElementById("about");

// Select the navigation bar
const navBar = document.getElementById("nav");

// Select the navbar-toggler button
const navbarToggler = document.querySelector(".navbar-toggler");

// Select all counter number elements
const nums = document.querySelectorAll(".counter .counter-number ");

// Select the counter section
const section = document.querySelector(".counter");

// Flag to track if counter has started
let started = false;

// Add scroll event listener to the window
window.addEventListener("scroll", () => {
  let current = "";

  // Iterate over each section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    const sectionBottom = sectionTop + section.offsetHeight;

    // Check if the current scroll position is within the section
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  // Check if the scroll position is past the about section
  const isPastAboutSection = scrollY >= aboutSection.offsetTop;

  // Toggle classes for the navigation bar based on scroll position
  navBar.classList.toggle("position-absolute", !isPastAboutSection);
  navBar.classList.toggle("position-fixed", isPastAboutSection);
  navBar.classList.toggle("bg-white", isPastAboutSection);

  // Toggle classes for navigation links based on scroll position
  navLinks.forEach((link) => {
    link.classList.toggle("text-white", !isPastAboutSection);
    link.classList.toggle("text-black", isPastAboutSection);
  });

  // Toggle classes for the logo based on scroll position
  logo.classList.toggle("text-white", !isPastAboutSection);
  logo.classList.toggle("text-black", isPastAboutSection);

  // Toggle classes for the navbar-toggler button based on scroll position
  navbarToggler.classList.toggle("text-white", !isPastAboutSection);
  navbarToggler.classList.toggle("text-black", isPastAboutSection);

  // Set CSS variable based on scroll position
  document.documentElement.style.setProperty(
    "--afterColour",
    isPastAboutSection ? "#000" : "#fff"
  );

  // Remove "active" class from all navigation links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add "active" class to the current navigation link
  const currentNavLink = document.querySelector(
    `nav ul li a[href="#${current}"]`
  );

  if (currentNavLink) {
    currentNavLink.classList.add("active");
  }
});

// Increasing counter
function startCounter(el) {
  const goal = el.dataset.goal;
  const intervalDuration = 2000 / goal; // Update interval duration to 2000 milliseconds (2 seconds)
  let count = 0;
  const countInterval = setInterval(() => {
    if (count < goal) {
      count += Math.ceil(goal / 300); // Increase count by a fraction of the goal
      el.textContent = count;
    } else {
      clearInterval(countInterval);
      el.textContent = goal; // Set the final count to the goal
    }
  }, intervalDuration);
}

// Add scroll event listener to the window
window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 400) {
    if (!started) {
      nums.forEach((num) => {
        startCounter(num);
      });
    }
    started = true;
  }
};
