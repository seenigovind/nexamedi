// script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to Nexa Medi Solutions – the future is loading...');

  // Dynamic Date for Welcome Message
  const currentDate = new Date().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const welcomeSection = document.querySelector('section');
  if (welcomeSection) {
    welcomeSection.innerHTML += `<p>Last updated: ${currentDate}</p>`;
  }

  // Smooth Scrolling for Navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      if (targetId === '') {
        window.location.href = this.getAttribute('href');
      }
    });
  });

  // Contact Form Submission with Formspree
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      // Formspree endpoint (replace with your Formspree form ID)
      const formspreeEndpoint = 'https://formspree.io/f/your-form-id'; // Sign up at formspree.io to get your ID
      const formData = new FormData(this);

      fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Thank you for your message! We will get back to you soon.');
          this.reset(); // Clear form
        } else {
          throw new Error('Failed to send message.');
        }
      })
      .catch(error => {
        alert('There was an error sending your message. Please try again later or email us directly at info@nexamedisolutions.com.au.');
        console.error('Error:', error);
      });
    });
  }

  // Dynamic Footer Acknowledgment Update
  const footer = document.querySelector('footer');
  if (footer) {
    const acknowledgment = footer.querySelector('p:nth-child(2)');
    if (acknowledgment) {
      acknowledgment.textContent = `We acknowledge the Wurundjeri and Boonwurrung peoples of the Kulin Nation as the Traditional Owners of the land on which we operate. Updated: ${currentDate}`;
    }
  }
});