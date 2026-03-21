// My Contract — Main JS Module
// Navigation, dark mode, TOC, utilities

(function () {
  'use strict';

  // -- Mobile Navigation Toggle --
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // -- Dark Mode --
  // Respects prefers-color-scheme by default (set in <head> inline script).
  // This section adds a manual toggle if one exists.
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try {
        localStorage.setItem('mc-theme', next);
      } catch (e) {
        // localStorage unavailable
      }
    });
  }

  // Restore saved theme preference
  try {
    const saved = localStorage.getItem('mc-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {
    // localStorage unavailable
  }

  // -- Table of Contents (auto-generated from h2 elements) --
  const tocList = document.getElementById('toc-list');
  if (tocList) {
    const prose = document.querySelector('.prose');
    if (prose) {
      const headings = prose.querySelectorAll('h2');
      headings.forEach((heading, i) => {
        // Ensure heading has an id
        if (!heading.id) {
          heading.id = 'section-' + (i + 1) + '-' + heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .substring(0, 50);
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });

      // Highlight active TOC entry on scroll
      if (headings.length > 0) {
        const tocLinks = tocList.querySelectorAll('a');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const id = entry.target.id;
                tocLinks.forEach((link) => {
                  link.classList.toggle('toc-active', link.getAttribute('href') === '#' + id);
                });
              }
            });
          },
          {
            rootMargin: '-80px 0px -70% 0px',
            threshold: 0,
          }
        );

        headings.forEach((heading) => observer.observe(heading));
      }
    }
  }

  // -- Smooth scroll for anchor links --
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', anchor.getAttribute('href'));
      }
    });
  });
})();
