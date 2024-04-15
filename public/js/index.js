window.addEventListener('load', (event) => {

  //
  // Reading bar
  // Inspired by https://codepen.io/haroldjc/pen/GZaqWa
  //

  var readingBar = document.getElementById("reading-bar");
  document.addEventListener("scroll", () => {
    if (!readingBar) return;
    var total = document.body.scrollHeight - window.innerHeight;
    var percent = (window.scrollY / total) * 100;

    if (percent > 5) {
      readingBar.style.width = percent + "%";
    } else {
      readingBar.style.width = "0%";
    }

    if (percent == 100) {
      readingBar.className = "finished";
    } else {
      readingBar.className = "";
    }
  });


  //
  // Nav Links Highlighting
  // Inspired by https://codepen.io/jonasmarco/pen/JjoKNaZ
  //

  // Make nav link be active on scroll when their section is on screen
  const navLinks = document.querySelectorAll('.nav-link');

  for (let n in navLinks) {
    if (navLinks.hasOwnProperty(n)) {
      navLinks[n].addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(navLinks[n].hash).scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  const sections = document.querySelectorAll('section[id]');
  const highlightCurrentNavLink = () => {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    const accuracy = window.innerHeight / 2; // Heighlight the section represents 50% of the viewport

    for (let s in sections) {
      if (sections.hasOwnProperty(s) && sections[s].offsetTop - accuracy <= scrollPos) {
        const id = sections[s].id;
        const sectionLink = document.querySelector(`a[href*=${id}]`);
        const sectionPreviousLink = document.querySelector('nav li.active');
        // Remove highlight on previous link
        if (sectionLink && sectionPreviousLink) sectionPreviousLink.classList.remove('active');
        // Add highlight on current link
        if (sectionLink) sectionLink.parentNode.classList.add('active');
      }
    }
  };
  window.addEventListener('scroll', highlightCurrentNavLink, false);
  highlightCurrentNavLink(); // Force on page load


  // Affix effect (reduce the menu size on scroll)
  const labels = document.getElementById('labels');
  const footer = document.getElementById('footer');
  window.addEventListener('scroll', () => {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    const labelsPos = (labels && labels.offsetTop) || Number.MAX_SAFE_INTEGER;
    const footerPos = (footer && footer.offsetTop) || Number.MAX_SAFE_INTEGER;
    if (scrollPos > 500 && scrollPos < Math.min(labelsPos, footerPos) - 100) {
      document.body.classList.add('affix');
    } else {
      document.body.classList.remove('affix');
    }
  }, false);


  //
  // Zen Mode
  //

  // Support a zen mode on long post
  const zenButtonIn = document.getElementById('zen-mode-in');
  const zenButtonOut = document.getElementById('zen-mode-out');
  if (zenButtonIn) {

    const enableZenMode = () => {
      document.body.classList.add('zen');
      zenButtonOut.classList.add('visible');
      localStorage.setItem('zen','enable');
    };
    const disableZenMode = () => {
      document.body.classList.remove('zen');
      zenButtonOut.classList.remove('visible');
      localStorage.setItem('zen','disable');
    };
    zenButtonIn.addEventListener('click', enableZenMode);
    zenButtonOut.addEventListener('click', disableZenMode);

    let zenMode = localStorage.getItem('zen');
    if (zenMode === 'enable') {
      enableZenMode();
    }
  }
});


