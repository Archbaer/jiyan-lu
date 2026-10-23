<script>
  import { onMount } from 'svelte';

  const stops = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'education', label: 'Education', icon: '✦' },
    { id: 'work', label: 'Work Experience', icon: '▣' },
    { id: 'skills', label: 'Skills & Strengths', icon: '✿' },
    { id: 'interests', label: 'Personal Interests', icon: '♡' },
    { id: 'contact', label: 'Contact', icon: '✉' }
  ];
  // Replace sample entries with approved CV details.
  const studies = [
    { date: '20XX – 20XX', title: 'Degree or qualification', place: 'Institution name', detail: 'Add subject, relevant study, and an achievement.' },
    { date: '20XX', title: 'Specialist study', place: 'Institution name', detail: 'Add tax, accounting, or audit training.' },
    { date: '20XX', title: 'Professional development', place: 'Institution name', detail: 'Add a certification or practical learning milestone.' }
  ];
  const roles = [
    { date: '20XX – Present', title: 'Tax audit role', place: 'Organisation name', detail: 'Add responsibilities, a project, and one measurable outcome.' },
    { date: '20XX – 20XX', title: 'Previous finance role', place: 'Organisation name', detail: 'Add a contribution or process improvement.' },
    { date: '20XX – 20XX', title: 'Early career experience', place: 'Organisation name', detail: 'Add the experience that built your technical foundation.' }
  ];
  const strengths = [
    { number: '01', title: 'Technical rigour', detail: 'Add audit methods, reporting standards, and tools.' },
    { number: '02', title: 'Clear analysis', detail: 'Show how you turn detail into useful findings.' },
    { number: '03', title: 'Trusted communication', detail: 'Show how you work with teams and explain complex work.' }
  ];

  let active = $state('home');
  let menuOpen = $state(false);
  let formNotice = $state('');

  function previewContact(event) {
    event.preventDefault();
    formNotice = 'Preview only. Add a real contact address before launch.';
  }

  onMount(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const main = document.querySelector('main');
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

    let frame = 0;
    function updateScroll() {
      frame = 0;
      const viewport = window.innerHeight;
      let current = 'home';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewport * 0.48 && rect.bottom > viewport * 0.48) current = section.id;
        if (rect.bottom > 0 && rect.top < viewport) {
          const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
          section.style.setProperty('--scroll-progress', progress.toFixed(3));
        }
      }
      if (current !== active) active = current;
    }
    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    }
    function closeMenuOnEscape(event) {
      if (event.key === 'Escape') menuOpen = false;
    }
    function scrollToStop(id, smooth = true) {
      const index = sections.findIndex((section) => section.id === id);
      if (index < 0) return;
      const mainTop = main.getBoundingClientRect().top + window.scrollY;
      const top = sections.slice(0, index).reduce((position, section) => position + section.offsetHeight, mainTop);
      window.scrollTo({ top, behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' });
    }
    function navigateToStop(event) {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const id = link?.getAttribute('href').slice(1);
      if (!id || !sections.some((section) => section.id === id)) return;
      event.preventDefault();
      menuOpen = false;
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
      scrollToStop(id);
    }
    function restoreStop() {
      requestAnimationFrame(() => scrollToStop(window.location.hash.slice(1), false));
    }
    updateScroll();
    document.addEventListener('click', navigateToStop, true);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('keydown', closeMenuOnEscape);
    window.addEventListener('popstate', restoreStop);
    return () => {
      revealObserver.disconnect();
      document.removeEventListener('click', navigateToStop, true);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('keydown', closeMenuOnEscape);
      window.removeEventListener('popstate', restoreStop);
      window.history.scrollRestoration = previousScrollRestoration;
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:head>
  <title>Livia’s Journey — Portfolio</title>
  <meta name="description" content="Follow Livia’s journey through education, work, strengths, and the places that shaped her." />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>

<header class="site-header">
  <button type="button" class="nav-peek" aria-label={menuOpen ? 'Close journey navigation' : 'Open journey navigation'} aria-expanded={menuOpen} aria-controls="journey-menu" onclick={() => menuOpen = !menuOpen}>
    <span aria-hidden="true">{menuOpen ? '⌃' : '⌄'}</span>
  </button>
  {#if menuOpen}
    <div class="nav-panel" id="journey-menu">
      <a class="brand" href="#home" aria-label="Livia's Journey, home"><span class="brand-icon" aria-hidden="true">✦</span><span>Livia’s Journey</span></a>
      <nav class="journey-nav" aria-label="Journey stops">
        <span class="nav-caption">The journey</span>
        {#each stops as stop}
          <a href={'#' + stop.id} class:active={active === stop.id} aria-current={active === stop.id ? 'location' : undefined}>
            <span class="nav-icon" aria-hidden="true">{stop.icon}</span><span>{stop.label}</span>
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>

<main id="main-content" tabindex="-1">
  <section class="hero chapter" id="home" aria-labelledby="home-title">
    <div class="hero-doodle heart" aria-hidden="true">♡</div><div class="hero-doodle plane" aria-hidden="true">✧</div>
    <div class="hero-content reveal">
      <span class="eyebrow">A little journey, a lot of heart</span>
      <h1 id="home-title"><span>Livia’s</span><span>Journey</span></h1>
      <p>Follow the road through the places, learning, and work that shaped Livia’s path in tax audit.</p>
      <a class="journey-button" href="#education">Start the journey <span aria-hidden="true">↗</span></a>
      <span class="hero-scroll-hint">Scroll to explore <span aria-hidden="true">↓</span></span>
    </div>
    <div class="hero-world" aria-label="Sculpted globe with London, Bristol and Shanghai landmarks">
      <div class="globe-scene">
        <img class="globe-image" src="/assets/journey-clay-world.png" alt="" />
        <span class="hero-dog dog-sprite" class:visible={active === 'home'} aria-hidden="true"></span>
      </div>
    </div>
    <span class="floating-cloud cloud-one" aria-hidden="true">☁</span><span class="floating-cloud cloud-two" aria-hidden="true">☁</span>
  </section>

  <section class="story-section chapter" id="education" aria-labelledby="education-title" style="--chapter-tint:#f8eadb">
    <div class="chapter-scene" aria-hidden="true">
      <span class="scene-label">Stop 01 · Learn</span>
      <img class="road-art" src="/assets/journey-clay-road.png" alt="" />
      <span class="scene-dog dog-sprite" class:visible={active === 'education'}></span>
      <div class="polaroid polaroid-one"><div class="photo-placeholder photo-london"><span>PHOTO TO COME</span></div><span class="polaroid-caption">A place to learn</span></div>
      <div class="polaroid polaroid-two"><div class="photo-placeholder photo-bristol"><span>PHOTO TO COME</span></div><span class="polaroid-caption">A milestone</span></div>
    </div>
    <div class="chapter-content">
      <header class="chapter-heading reveal">
        <div><span class="eyebrow">Stop 01 · Where it began</span><h2 id="education-title">Education</h2><p>Qualifications and specialist study that shaped Livia’s approach to thoughtful work.</p></div>
      </header>
      <div class="timeline" aria-label="Education timeline">
        {#each studies as study}
          <article class="timeline-entry reveal"><span class="timeline-date">{study.date}</span><span class="timeline-dot" aria-hidden="true"></span>
            <div class="paper-card"><div class="card-meta"><span class="card-overline">Education · sample content</span><span class="inline-date">{study.date}</span></div><h3>{study.title}</h3><strong>{study.place}</strong><p>{study.detail}</p></div>
          </article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Space for a memory</span><strong>A favourite learning moment</strong><p>Add one real photo or sentence from this stop.</p></div><a href="#work">Next: Work Experience <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="work" aria-labelledby="work-title" style="--chapter-tint:#fff8ec">
    <div class="chapter-scene scene-reversed" aria-hidden="true">
      <span class="scene-label">Stop 02 · Grow</span>
      <img class="road-art road-art-work" src="/assets/journey-clay-road.png" alt="" />
      <span class="scene-dog dog-sprite" class:visible={active === 'work'}></span>
      <div class="polaroid polaroid-one"><div class="photo-placeholder photo-shanghai"><span>PHOTO TO COME</span></div><span class="polaroid-caption">Office life</span></div>
      <div class="polaroid polaroid-two"><div class="photo-placeholder photo-london"><span>PHOTO TO COME</span></div><span class="polaroid-caption">Teamwork</span></div>
      <div class="polaroid polaroid-three"><div class="photo-placeholder photo-bristol"><span>PHOTO TO COME</span></div><span class="polaroid-caption">New challenges</span></div>
    </div>
    <div class="chapter-content">
      <header class="chapter-heading reveal">
        <div><span class="eyebrow">Stop 02 · Turning knowledge into practice</span><h2 id="work-title">Work Experience</h2><p>A record of roles, responsibilities, and the judgement built along the way.</p></div>
      </header>
      <div class="timeline" aria-label="Work experience timeline">
        {#each roles as role}
          <article class="timeline-entry reveal"><span class="timeline-date">{role.date}</span><span class="timeline-dot" aria-hidden="true"></span>
            <div class="paper-card"><div class="card-meta"><span class="card-overline">Work · sample content</span><span class="inline-date">{role.date}</span></div><h3>{role.title}</h3><strong>{role.place}</strong><p>{role.detail}</p></div>
          </article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Space for a memory</span><strong>A project to remember</strong><p>Add a specific result or team moment here.</p></div><a href="#skills">Next: Skills &amp; Strengths <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="skills" aria-labelledby="skills-title" style="--chapter-tint:#eff4e8">
    <div class="chapter-scene" aria-hidden="true"><span class="scene-label">Stop 03 · Shine</span><img class="road-art" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'skills'}></span><div class="polaroid polaroid-one"><div class="photo-placeholder photo-shanghai"><span>PHOTO TO COME</span></div><span class="polaroid-caption">Skills in action</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Stop 03 · What she brings</span><h2 id="skills-title">Skills &amp; Strengths</h2><p>Careful thinking, clear communication, and a little curiosity.</p></div></header>
      <div class="road-stops">
        {#each strengths as strength}
          <article class="paper-card stop-card reveal"><span class="stop-number">{strength.number}</span><h3>{strength.title}</h3><p>{strength.detail}</p></article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Space for an example</span><strong>Show it in action</strong><p>Add a real example of these strengths at work.</p></div><a href="#interests">Next: Personal Interests <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="interests" aria-labelledby="interests-title" style="--chapter-tint:#fff0e8">
    <div class="chapter-scene scene-reversed" aria-hidden="true"><span class="scene-label">Stop 04 · Explore</span><img class="road-art road-art-work" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'interests'}></span><div class="polaroid polaroid-one"><div class="photo-placeholder photo-bristol"><span>PHOTO TO COME</span></div><span class="polaroid-caption">Beyond the office</span></div><div class="polaroid polaroid-two"><div class="photo-placeholder photo-london"><span>PHOTO TO COME</span></div><span class="polaroid-caption">A favourite place</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Stop 04 · The person behind the work</span><h2 id="interests-title">Personal Interests</h2><p>A few more stops make a journey more memorable.</p></div></header>
      <div class="paper-card interests-card reveal"><span class="card-overline">Personal interests · sample content</span><h3>Curiosity beyond the numbers.</h3><p>Add places, hobbies, causes, or projects that say something about Livia.</p><div class="interest-tags"><span>Interest one</span><span>Interest two</span><span>Interest three</span></div></div>
      <div class="interest-moments reveal"><div class="paper-card"><span class="card-overline">Photo story · placeholder</span><h3>A favourite place</h3><p>Add a photo and one short memory.</p></div><div class="paper-card"><span class="card-overline">Little joy · placeholder</span><h3>Beyond work</h3><p>Add a hobby, cause, or small joy.</p></div></div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Space for a personal note</span><strong>A little more of Livia</strong><p>Add a personal photo or a favourite place.</p></div><a href="#contact">Next: Contact <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="contact" aria-labelledby="contact-title" style="--chapter-tint:#f4e9dd">
    <div class="chapter-scene" aria-hidden="true"><span class="scene-label">Final stop · Hello</span><img class="road-art" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'contact'}></span><div class="polaroid polaroid-one"><div class="photo-placeholder photo-shanghai"><span>PHOTO TO COME</span></div><span class="polaroid-caption">Next chapter</span></div><div class="scene-stamp contact-stamp">Next stop? <span>♡</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Final stop · Say hello</span><h2 id="contact-title">Let’s Connect</h2><p>For opportunities, conversations, or a thoughtful introduction.</p></div></header>
      <form class="paper-card contact-form reveal" onsubmit={previewContact}>
        <span class="card-overline">A note for Livia</span>
        <label><span>Name</span><input type="text" name="name" placeholder="Your name" required autocomplete="name" /></label>
        <label><span>Email</span><input type="email" name="email" placeholder="Your email" required autocomplete="email" /></label>
        <label><span>Message</span><textarea name="message" placeholder="Write your message" rows="4" required></textarea></label>
        <button class="journey-button" type="submit">Send a note <span aria-hidden="true">↗</span></button>
        {#if formNotice}<p class="form-notice" role="status">{formNotice}</p>{/if}
        <small>Preview form. Connect a real inbox before launch.</small>
      </form>
      <div class="chapter-trail reveal"><div><span class="card-overline">Before launch</span><strong>Ready for the next chapter</strong><p>Replace preview form with live contact details.</p></div><a href="#home">Back to Home <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
</main>

<footer>Made with care for Livia’s next chapter. <a href="#home">Back to start ↑</a></footer>
