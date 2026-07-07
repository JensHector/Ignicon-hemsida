/* Ignicon AB — main.js */
(function () {
  'use strict';

  /* Nav: transparent → navy vid scroll */
  var nav = document.getElementById('mainNav');
  function onScroll() {
    var s = window.scrollY > 40;
    nav.classList.toggle('scrolled', s);
    document.body.classList.toggle('scrolled', s);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobilmeny */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    function setMenu(open) {
      links.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.style.overflow = open ? 'hidden' : '';
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !links.classList.contains('open')) { setMenu(false); return; }
      e.preventDefault();
      setMenu(false);
      setTimeout(function () { window.location.href = a.href; }, 480);
    });
  }

  /* Scroll-reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* FAQ-accordion */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Hero-video: ladda bara på större skärmar, annars poster */
  var video = document.getElementById('heroVideo');
  if (video) {
    var wantsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isDesktop = window.matchMedia('(min-width: 721px)').matches;
    if (wantsMotion && isDesktop) {
      video.querySelectorAll('source[data-src]').forEach(function (s) {
        s.src = s.getAttribute('data-src');
      });
      video.load();
      video.play().catch(function () { /* autoplay-block: postern visas */ });
    } else {
      video.remove(); /* postern (img) ligger kvar under */
    }
  }
})();
