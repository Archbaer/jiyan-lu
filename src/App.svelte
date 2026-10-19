<script>
  import { onMount } from 'svelte';

  // Replace empty paths with Livia's photos. Each section supports three images.
  const photos = {
    education: ['', '', ''],
    work: ['', '', ''],
    interests: ['']
  };
  const placeLogos = { education: ['', '', ''], work: ['', '', ''] };
  const roles = [
    { date: '20XX — PRESENT', title: 'Tax audit role', organisation: 'Organisation name', detail: 'Add scope of work, key responsibilities, and one measurable outcome.' },
    { date: '20XX — 20XX', title: 'Previous finance role', organisation: 'Organisation name', detail: 'Describe a project, process improvement, or client contribution.' },
    { date: '20XX — 20XX', title: 'Early career experience', organisation: 'Organisation name', detail: 'Show how this experience built your technical foundation.' }
  ];
  const studies = [
    { label: 'A', title: 'Degree or qualification', meta: 'Institution · 20XX–20XX', detail: 'Add subject, relevant modules, and one achievement that shows analytical depth.' },
    { label: 'B', title: 'Specialist study', meta: 'Institution · 20XX', detail: 'Add tax, accounting, or audit training relevant to Livia’s professional path.' },
    { label: 'C', title: 'Professional development', meta: 'Institution · 20XX', detail: 'Add certification, research, or ongoing learning with a practical outcome.' }
  ];
  const strengths = [
    { number: '01', title: 'Technical rigour', detail: 'Add audit methods, reporting standards, and tools you use with confidence.' },
    { number: '02', title: 'Clear analysis', detail: 'Show how you turn detailed financial information into useful findings.' },
    { number: '03', title: 'Trusted communication', detail: 'Describe how you work with teams and explain complex issues clearly.' }
  ];
  const checkpoints = [
    { id: 'education', label: 'Education' },
    { id: 'work', label: 'Experience' },
    { id: 'skills', label: 'Strengths' },
    { id: 'interests', label: 'Beyond work' },
    { id: 'contact', label: 'Contact' }
  ];

  let active = 'home';
  let connectorPath = '';
  let connectorViewBox = '0 0 1 1';
  let connectorOuter = 126;
  let connectorInner = 108;
  let walkerX = 170;
  let walkerY = 0;
  let walking = false;
  let formNotice = '';
  let walkTimer;
  let scrollFrame;

  function updateWalker() {
    const stages = document.querySelector('.journey-stages');
    if (!stages) return;
    const start = stages.getBoundingClientRect().top + window.scrollY;
    walkerY = Math.max(120, Math.min(stages.offsetHeight - 150, window.scrollY + window.innerHeight * 0.52 - start));
    const road = stages.querySelector('.journey-road');
    const path = road.querySelector('path');
    const point = path.getPointAtLength(path.getTotalLength() * walkerY / stages.offsetHeight);
    walkerX = point.x * road.getBoundingClientRect().width / 360 + road.getBoundingClientRect().left - stages.getBoundingClientRect().left;
  }

  function updateConnector() {
    const hero = document.querySelector('.hero');
    const world = document.querySelector('.hero-world');
    const road = document.querySelector('.journey-road');
    if (!hero || !world || !road) return;
    const heroRect = hero.getBoundingClientRect();
    const worldRect = world.getBoundingClientRect();
    const roadRect = road.getBoundingClientRect();
    const startX = worldRect.left - heroRect.left + worldRect.width * 0.34;
    const startY = worldRect.top - heroRect.top + worldRect.height * 0.76;
    const endX = roadRect.left - heroRect.left + roadRect.width * 170 / 360;
    const endY = heroRect.height;
    const stageSlope = ((170 - 188) * roadRect.width / 360) / (100 * roadRect.height / 5000);
    connectorViewBox = `0 0 ${heroRect.width} ${heroRect.height}`;
    connectorPath = `M ${startX} ${startY} C ${startX - 30} ${startY + 115}, ${endX - stageSlope * 170} ${endY - 170}, ${endX} ${endY} L ${endX + stageSlope * 90} ${endY + 90}`;
    connectorOuter = roadRect.width * 126 / 360;
    connectorInner = roadRect.width * 108 / 360;
  }

  function updateLayout() {
    updateWalker();
    updateConnector();
  }

  function onScroll() {
    if (!scrollFrame) {
      scrollFrame = requestAnimationFrame(() => {
        updateWalker();
        scrollFrame = 0;
      });
    }
    walking = true;
    clearTimeout(walkTimer);
    walkTimer = setTimeout(() => { walking = false; }, 170);
  }

  function previewContact(event) {
    event.preventDefault();
    formNotice = 'Preview only. Connect an email address or form service before launch.';
  }

  onMount(() => {
    const sections = document.querySelectorAll('main section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      if (visible[0]) active = visible[0].target.id;
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    window.addEventListener('resize', updateLayout);
    window.addEventListener('scroll', onScroll, { passive: true });
    updateLayout();
    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollFrame);
      clearTimeout(walkTimer);
    };
  });
</script>

<svelte:head>
  <meta property="og:title" content="Livia's Journey — Tax Audit Portfolio" />
  <meta property="og:description" content="An illustrated professional journey through tax audit, education, experience, and interests." />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to content</a>

<main id="main-content">
  <section class="hero" id="home" aria-labelledby="hero-title">
    <div class="hero-cloud hero-cloud-left" aria-hidden="true"></div>
    <div class="hero-cloud hero-cloud-right" aria-hidden="true"></div>
    <svg class="hero-road" viewBox={connectorViewBox} preserveAspectRatio="none" aria-hidden="true">
      <path d={connectorPath} fill="none" stroke="#d5e0dc" stroke-width={connectorOuter} />
      <path d={connectorPath} fill="none" stroke="#788d90" stroke-width={connectorInner} />
      <path d={connectorPath} fill="none" stroke="#f6efcf" stroke-width="3" stroke-dasharray="24 26" />
    </svg>
    <nav class="checkpoint-nav" aria-label="Journey checkpoints">
      <span class="checkpoint-caption">Journey stops</span>
      <ol>{#each checkpoints as stop, index}<li class:next-stop={active === 'home' && index === 0} class:current-stop={active === stop.id}><a href={'#' + stop.id} aria-current={active === stop.id ? 'location' : undefined}><span class="checkpoint-number">0{index + 1}</span><span>{stop.label}</span></a></li>{/each}</ol>
    </nav>
    <div class="hero-world">
      <h1 id="hero-title" aria-label="Livia’s Journey"><svg viewBox="0 0 900 250" aria-hidden="true"><defs><path id="title-arc" d="M 40 215 C 240 35 660 35 860 215" /></defs><text><textPath href="#title-arc" startOffset="50%" text-anchor="middle">Livia’s Journey</textPath></text></svg></h1>
      <img src="/assets/journey-pixel-world.png" alt="Pixel-art world with Westminster and Big Ben, Bristol's Clifton Suspension Bridge, and Shanghai's skyline" />
      <div class="hero-orbit-dog" aria-hidden="true"><div class="dog-sprite"></div></div>
    </div>
    <aside class="hero-socials" aria-label="Social profile space"><span>Find Livia</span><div class="social-placeholder"><strong>in</strong><span>LinkedIn<small>Profile link to add</small></span></div></aside>
  </section>

  <div class="journey-stages">
    <svg class="journey-road" viewBox="0 0 360 5000" preserveAspectRatio="none" aria-hidden="true">
      <path d="M188 -100 L170 0 C115 300 220 620 135 950 S225 1530 155 1900 S120 2450 205 2870 S115 3500 165 3930 S215 4650 170 5000" fill="none" stroke="#d5e0dc" stroke-width="126" />
      <path d="M188 -100 L170 0 C115 300 220 620 135 950 S225 1530 155 1900 S120 2450 205 2870 S115 3500 165 3930 S215 4650 170 5000" fill="none" stroke="#788d90" stroke-width="108" />
      <path d="M188 -100 L170 0 C115 300 220 620 135 950 S225 1530 155 1900 S120 2450 205 2870 S115 3500 165 3930 S215 4650 170 5000" fill="none" stroke="#f6efcf" stroke-width="3" stroke-dasharray="24 26" />
    </svg>
    <div class="road-walker" class:walking class:at-contact={active === 'contact'} style={'left:' + walkerX + 'px;top:' + walkerY + 'px'} aria-hidden="true"><div class="dog-sprite"></div></div>

  <section class="story-section education" id="education" aria-labelledby="education-title">
    <div class="roadside-sign" aria-hidden="true"><span>Education</span></div>
    <div class="stage-content">
      <header class="section-heading reveal"><svg class="chapter-motif" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 27V9l5-5 5 5v18M8 27h16M12 13h8M16 15v5m-4 3h8" /></svg><h2 id="education-title">Education</h2><p>Qualifications, specialist study, and experiences that shaped the way Livia approaches complex work.</p></header>
    </div>
    <div class="journey-list">
      {#each studies as study, index}
        <div class="journey-row">
          <figure class="photo-slot road-photo reveal"><div class="photo-window">{#if photos.education[index]}<img src={photos.education[index]} alt={'Livia education photo ' + (index + 1)} />{:else}<span class="photo-plus" aria-hidden="true">+</span><span>PHOTO 0{index + 1}</span>{/if}</div><figcaption>{['Campus or place', 'Study or achievement', 'A milestone'][index]}</figcaption></figure>
          <article class="journey-card paper-card reveal"><div><span class="card-kicker">EDUCATION · {study.label}</span><h3>{study.title}</h3><strong>{study.meta}</strong><p>{study.detail}</p></div><div class="place-logo">{#if placeLogos.education[index]}<img src={placeLogos.education[index]} alt={study.meta + ' logo'} />{:else}<span>PLACE<br />LOGO</span>{/if}</div></article>
        </div>
      {/each}
    </div>
  </section>

  <section class="story-section work" id="work" aria-labelledby="work-title">
    <div class="roadside-sign" aria-hidden="true"><span>Experience</span></div>
    <div class="stage-content">
      <header class="section-heading reveal"><svg class="chapter-motif" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 25h26M6 25V8m20 17V8M6 10c6 10 14 10 20 0M10 15v10m6-6v6m6-10v10" /></svg><h2 id="work-title">Work experience</h2><p>A concise record of responsibilities, results, and the judgement developed along the way.</p></header>
    </div>
    <div class="journey-list">
      {#each roles as role, index}
        <div class="journey-row">
          <figure class="photo-slot road-photo reveal"><div class="photo-window">{#if photos.work[index]}<img src={photos.work[index]} alt={'Livia work photo ' + (index + 1)} />{:else}<span class="photo-plus" aria-hidden="true">+</span><span>PHOTO 0{index + 1}</span>{/if}</div><figcaption>{['Team or office', 'Project moment', 'Professional milestone'][index]}</figcaption></figure>
          <article class="journey-card paper-card reveal"><div><span class="card-kicker">{role.date} · {role.organisation}</span><h3>{role.title}</h3><p>{role.detail}</p></div><div class="place-logo">{#if placeLogos.work[index]}<img src={placeLogos.work[index]} alt={role.organisation + ' logo'} />{:else}<span>PLACE<br />LOGO</span>{/if}</div></article>
        </div>
      {/each}
      <p class="sample-note">Roles, dates, outcomes, and photographs shown as placeholders until Livia supplies final material.</p>
    </div>
  </section>

  <section class="story-section skills" id="skills" aria-labelledby="skills-title">
    <div class="roadside-sign" aria-hidden="true"><span>Strengths</span></div>
    <div class="stage-content">
      <header class="section-heading reveal"><svg class="chapter-motif" viewBox="0 0 32 32" aria-hidden="true"><path d="M27 5C11 5 5 11 5 19c0 5 3 8 8 8 8 0 14-7 14-22ZM7 25c4-6 10-10 18-14" /></svg><h2 id="skills-title">Skills & strengths</h2><p>Professional strengths are most useful when backed by real examples. These are suggested categories to tailor.</p></header>
      <div class="strength-grid">
        {#each strengths as strength}
          <article class="strength-card paper-card reveal"><span>{strength.number}</span><h3>{strength.title}</h3><p>{strength.detail}</p></article>
        {/each}
      </div>
    </div>
  </section>

  <section class="story-section interests" id="interests" aria-labelledby="interests-title">
    <div class="roadside-sign" aria-hidden="true"><span>Beyond work</span></div>
    <div class="stage-content">
      <header class="section-heading reveal"><svg class="chapter-motif" viewBox="0 0 32 32" aria-hidden="true"><path d="m16 3 3.6 9.4L29 16l-9.4 3.6L16 29l-3.6-9.4L3 16l9.4-3.6L16 3Z" /></svg><h2 id="interests-title">Beyond work</h2><p>A considered glimpse of the person behind the professional profile.</p></header>
      <div class="interests-grid">
        <figure class="photo-slot interest-photo reveal"><div class="photo-window">{#if photos.interests[0]}<img src={photos.interests[0]} alt="Livia outside work" />{:else}<span class="photo-plus" aria-hidden="true">+</span><span>LIVIA PHOTO</span>{/if}</div><figcaption>Replace with a favourite personal photo.</figcaption></figure>
        <div class="interests-copy paper-card reveal"><span class="card-kicker">PERSONAL INTERESTS · SAMPLE CONTENT</span><h3>Curiosity beyond the numbers.</h3><p>Add a few meaningful interests: a place, a hobby, a cause, or a project that says something about Livia.</p><div class="interest-tags"><span>Interest one</span><span>Interest two</span><span>Interest three</span></div></div>
      </div>
    </div>
  </section>

  <section class="story-section contact" id="contact" aria-labelledby="contact-title">
    <div class="roadside-sign" aria-hidden="true"><span>Contact</span></div>
    <div class="mailbox-scene" aria-hidden="true"><div class="mailbox"><span>MAIL</span><i></i></div><div class="mailbox-post"></div><img class="mailbox-dog" src="/assets/contact-dog-posting.png" alt="" /></div>
    <div class="stage-content contact-grid">
      <div class="contact-intro reveal"><svg class="chapter-motif" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 8h24v17H4zM4 9l12 9L28 9" /></svg><h2 id="contact-title">Let’s connect.</h2><p>For opportunities, professional conversations, or a thoughtful introduction.</p><div class="contact-rule"></div><span class="contact-small">A good working relationship starts with a clear conversation.</span></div>
      <form class="contact-form paper-card reveal" on:submit={previewContact}><div class="letter-heading"><div><span>TO LIVIA · PERSONAL POST</span><strong>Leave a note</strong></div><span aria-hidden="true">✉</span></div><label><span>Name</span><input type="text" name="name" placeholder="Your name" required autocomplete="name" /></label><label><span>Email</span><input type="email" name="email" placeholder="Your email" required autocomplete="email" /></label><label><span>Message</span><textarea name="message" placeholder="How can I help?" rows="4" required></textarea></label><button type="submit">Post message <span aria-hidden="true">↗</span></button>{#if formNotice}<p class="form-notice" role="status">{formNotice}</p>{/if}<p class="form-helper">Preview form. Connect a real inbox before public launch.</p></form>
    </div>
  </section>
  </div>
  <footer><a href="#home">Back to top ↑</a></footer>
</main>
