// Scroll animations
function handleScroll() {
  const cards = document.querySelectorAll('.card, .project-card');
  const skillsCard = document.querySelector('.skills-card');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#navbar a');

  // Navbar background opacity and blur
  if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.9)';
      navbar.style.boxShadow = 'none';
  }

  // Animate elements when they come into view
  const animateOnScroll = (element) => {
      if (!element) return;
      
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }
  };

  // Update active navigation link based on scroll position
  let currentSection = '';
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
          currentSection = section.getAttribute('id');
      }
  });

  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
          link.classList.add('active');
      }
  });

  // Animate cards
  cards.forEach(card => animateOnScroll(card));
  if (skillsCard) animateOnScroll(skillsCard);

  // Parallax effect for hero section
  const hero = document.querySelector('.hero-section');
  if (hero) {
      const scrolled = window.scrollY;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  // Animate timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
      const elementTop = item.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
      }
  });

  // Project cards specific animations
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
      const elementTop = card.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
          setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
          }, index * 100); // Staggered animation
      }
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const skillsCard = document.querySelector('.skills-card');
  const projectCards = document.querySelectorAll('.project-card');

  // Set initial state
  [...cards, skillsCard, ...projectCards].forEach(element => {
      if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          element.style.transition = 'all 0.6s ease';
      }
  });

  // Initialize skill bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
      if (!bar) return;
      const width = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
          bar.style.width = width;
      }, 500);
  });

  // Initialize timeline animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
      if (!item) return;
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.6s ease';
  });

  // Trigger initial animations
  handleScroll();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      }
  });
});

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Glitch effect for hero title
const glitchText = document.querySelector('.glitch');
if (glitchText) {
  setInterval(() => {
      glitchText.style.animation = 'none';
      void glitchText.offsetWidth;
      glitchText.style.animation = null;
  }, 4000);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add your form submission logic here
      const formData = new FormData(e.target);
      console.log('Form submitted:', Object.fromEntries(formData));
      
      // Clear form
      e.target.reset();
      
      // Show success message
      alert('Message sent successfully!');
  });
}