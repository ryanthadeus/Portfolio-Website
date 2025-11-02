// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initScrollAnimations()
  initPortfolioFilter()
  initContactForm()
  initSmoothScrolling()
})

// Navigation functionality
function initNavigation() {
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink)
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  const scrollPosition = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  // Update navbar background on scroll
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.8)"
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    observer.observe(element)
  })
}

// Portfolio filter functionality
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.classList.remove("hide")
          setTimeout(() => {
            item.style.display = "block"
          }, 10)
        } else {
          item.classList.add("hide")
          setTimeout(() => {
            if (item.classList.contains("hide")) {
              item.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    showNotification("Message sent successfully! I'll get back to you soon.", "success")
    this.reset()

    // In a real application, you would send the data to your server here
    console.log("Form submitted:", { name, email, subject, message })
  })
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 10)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Smooth scrolling for hero buttons
  const heroButtons = document.querySelectorAll(".hero-buttons .btn")
  heroButtons.forEach((button) => {
    if (button.getAttribute("href").startsWith("#")) {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    }
  })
}

// Typing animation for hero title (optional enhancement)
function initTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title")
  if (!heroTitle) return

  const text = heroTitle.textContent
  const highlightText = heroTitle.querySelector(".highlight").textContent
  const beforeHighlight = text.split(highlightText)[0]
  const afterHighlight = text.split(highlightText)[1]

  heroTitle.innerHTML = beforeHighlight + '<span class="highlight typing-cursor"></span>' + afterHighlight

  const highlightSpan = heroTitle.querySelector(".highlight")
  let i = 0

  function typeWriter() {
    if (i < highlightText.length) {
      highlightSpan.textContent = highlightText.substring(0, i + 1)
      i++
      setTimeout(typeWriter, 100)
    } else {
      highlightSpan.classList.remove("typing-cursor")
    }
  }

  // Start typing animation after a delay
  setTimeout(typeWriter, 1000)
}

// Parallax effect for hero section (optional enhancement)
function initParallaxEffect() {
  const hero = document.querySelector(".hero")
  if (!hero) return

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxSpeed = 0.5

    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    }
  })
}

// Lazy loading for images (optional enhancement)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Theme toggle functionality (optional enhancement)
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) return

  const currentTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  })
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll-heavy functions
window.addEventListener("scroll", debounce(updateActiveNavLink, 10))

// Accessibility enhancements
function initAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: var(--primary-foreground);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px"
  })

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main landmark
  const main = document.querySelector("main")
  if (main) {
    main.id = "main"
  }

  // Announce page changes for screen readers
  const sections = document.querySelectorAll("section[id]")
  sections.forEach((section) => {
    section.setAttribute("tabindex", "-1")
  })
}

// Initialize accessibility features
initAccessibility()

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
📧 Contact: your.email@example.com
🔗 GitHub: https://github.com/yourusername
💼 LinkedIn: https://linkedin.com/in/yourprofile

Built with vanilla HTML, CSS, and JavaScript
`)