
document.addEventListener('DOMContentLoaded', () => {

  const typingElement = document.querySelector('.typing');
  const cursorElement = document.querySelector('.typing__cursor');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  

  if (!typingElement || !cursorElement) return;


  const typingDelay = 100;    
  const erasingDelay = 50;    
  const newTextDelay = 2000;  
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimeout;


  function type() {
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav__menu--open');        
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
      });
      
      document.querySelectorAll('.nav__menu a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('nav__menu--open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    if (typeof translations === 'undefined' || typeof currentLang === 'undefined') return;

    const currentRoles = translations[currentLang].hero.roles; 
    
    if (!currentRoles || currentRoles.length === 0) return;

    const currentRole = currentRoles[roleIndex];

    if (isDeleting) {
      // BORRANDO
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex > 0) {
        typeTimeout = setTimeout(type, erasingDelay);
      } else {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % currentRoles.length; 
        typeTimeout = setTimeout(type, typingDelay + 500);
      }
    } else {

      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex < currentRole.length) {
        typeTimeout = setTimeout(type, typingDelay);
      } else {
        isDeleting = true;
        typeTimeout = setTimeout(type, newTextDelay);
      }
    }
  }


  setTimeout(type, newTextDelay + 250);
  const langBtnElement = document.getElementById('langToggle');
  if(langBtnElement) {
      langBtnElement.addEventListener('click', () => {
          clearTimeout(typeTimeout);
          isDeleting = true; 
          setTimeout(type, 200);
      });
  }
});