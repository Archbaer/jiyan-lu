<script>
  import { onMount } from 'svelte';

  const stops = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'education', label: 'Education', icon: '✦' },
    { id: 'work', label: 'Work Experience', icon: '▣' },
    { id: 'skills', label: 'Skills & Strengths', icon: '✿' },
    { id: 'interests', label: 'Beyond Work', icon: '♡' },
    { id: 'contact', label: 'Contact', icon: '✉' }
  ];
  const studies = [
    {
      date: 'Sep 2025 – Expected Jan 2027',
      title: 'MSc Accounting, Finance and Management',
      place: 'University of Bristol',
      details: [
        'Key courses: Financial Management, International Financial Reporting, and International Strategic Management.',
        'Awarded the Think Big Career Accelerator Scholarship.'
      ]
    },
    {
      date: 'Sep 2019 – Jun 2023',
      title: 'Bachelor of Auditing (ACCA Programme)',
      place: 'Nanjing Audit University',
      details: [
        'Key courses: ACCA subjects, Accounting, Management, and Fundamentals of Auditing.',
        'Ranked in the top 30% with an academic average of 82.53/100; passed nine ACCA exams.'
      ]
    }
  ];
  const roles = [
    {
      date: 'Mar 2026 – May 2026',
      title: 'Think Big Student Assistant · Part-time',
      place: 'University of Bristol Think Big Scholarship Team · Bristol',
      details: [
        'Independently screened scholarship applications against agreed assessment criteria and worked with academic assessors to resolve review issues and support consistent, fair decisions.',
        'Completed assessor training and proposed process and administrative improvements that strengthened assessment standards and team coordination; received formal recognition from the Think Big programme.'
      ]
    },
    {
      date: 'Feb 2026 – Mar 2026',
      title: 'Student Consultant · Part-time',
      place: 'University of Bristol Business School · Micro Internship',
      details: [
        'Led a six-member team developing a £150,000 SEIS fundraising strategy for an early-stage PropTech company, managing client communication, coordination, and delivery over three weeks.',
        'Analysed company and investor eligibility, investment limits, income tax relief, and capital gains tax relief, converting the findings into investor-screening criteria.',
        'Evaluated 15+ prospective investors and platforms by eligibility, sector fit, stage, and typical ticket size; delivered a financing roadmap rated “Excellent” by the client.'
      ]
    },
    {
      date: 'Apr 2024 – Aug 2024',
      title: 'Operations Management Trainee · Full-time',
      place: 'Shanghai Baozun E-commerce Co., Ltd. · NASDAQ: BZUN',
      details: [
        'Planned campaign schedules, selected products, and configured landing and collection pages in line with brand calendars and merchandising plans.',
        'Worked with design and technology teams to optimise store pages and promotional modules; completed 150+ page updates and 372+ module updates to support on-time campaign launches.'
      ]
    },
    {
      date: 'Jan 2022 – Mar 2022',
      title: 'Audit Intern · Full-time',
      place: 'RSM China · Rongcheng Certified Public Accountants',
      details: [
        'Supported three IPO audit engagements in Nanjing, Suzhou, and Guizhou through inventory counts, sample vouching, transaction testing, and Excel reconciliation using VLOOKUP.',
        'Prepared, issued, and tracked bank and related-party confirmations, independently completing confirmations with six banks for the Suzhou engagement; organised interview records and supporting documents.'
      ]
    }
  ];
  const strengths = [
    { number: '01', title: 'Tax & Financial Reporting', detail: 'UK SEIS tax research, eligibility requirements and tax reliefs, financial reporting, data reconciliation, and basic IFRS knowledge supported by nine passed ACCA exams.' },
    { number: '02', title: 'Data & Analysis', detail: 'Microsoft Excel for VLOOKUP, reconciliation, and data analysis; Stata for statistical analysis.' },
    { number: '03', title: 'Communication & Languages', detail: 'Professional report writing, client communication, and presentations. Native Mandarin and English with IELTS 7.0.' },
    { number: '04', title: 'Organisation & Delivery', detail: 'Project coordination, prioritisation, and team collaboration developed through client consulting, audit, and operations roles.' }
  ];
  const activities = [
    {
      date: 'Dec 2025 – May 2026',
      title: 'Production Lead',
      place: 'University of Bristol Team · UK',
      details: [
        'Led production planning across multiple simulation rounds, balancing capacity, raw materials, product priorities, demand, and cost while coordinating cash-flow decisions with the finance function.',
        'Improved production and inventory efficiency, helping the team place first in its group and become the first University of Bristol postgraduate team to reach the global final; featured by university media.'
      ]
    },
    {
      date: 'Sep 2019 – Aug 2023',
      title: 'Debate Team Member',
      place: 'Nanjing Audit University · China',
      details: [
        'Represented the team in internal and external competitions, achieving the championship in school competitions.',
        'Reached the global top eight in the 2021 “Huaxia Cup” International Chinese Debate Championship, developing clear communication, extensive research, and argument-writing skills.'
      ]
    }
  ];

  const linkedInUrl = 'https://www.linkedin.com/in/livia-lu-584baa390/';
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  let active = $state('home');
  let menuOpen = $state(false);
  let sending = $state(false);
  let formNotice = $state('');
  let formError = $state(false);

  async function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!web3FormsKey) {
      formError = true;
      formNotice = 'Contact form is not configured yet. Please use LinkedIn.';
      return;
    }

    sending = true;
    formError = false;
    formNotice = '';
    const payload = Object.fromEntries(new FormData(form));
    payload.access_key = web3FormsKey;
    payload.subject = `Portfolio enquiry from ${payload.name}`;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Submission failed');
      form.reset();
      formNotice = 'Thanks — your message has been sent.';
    } catch {
      formError = true;
      formNotice = 'Message could not be sent. Please try again or use LinkedIn.';
    } finally {
      sending = false;
    }
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
      const id = window.location.hash.slice(1) || 'home';
      requestAnimationFrame(() => scrollToStop(id, false));
    }
    updateScroll();
    document.addEventListener('click', navigateToStop, true);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('keydown', closeMenuOnEscape);
    window.addEventListener('popstate', restoreStop);
    if (window.location.hash) document.fonts.ready.then(restoreStop);
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
  <title>Jiyan (Livia) Lu | Accounting, Finance &amp; Tax</title>
  <meta name="description" content="Portfolio of Jiyan (Livia) Lu, an MSc Accounting, Finance and Management candidate with ACCA, IPO audit, and UK SEIS consulting experience." />
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
      <span class="eyebrow">Jiyan (Livia) Lu · Bristol, UK</span>
      <h1 id="home-title"><span>Livia’s</span><span>Journey</span></h1>
      <p>MSc Accounting, Finance and Management candidate at the University of Bristol, with nine ACCA exams passed and experience across IPO audit and UK SEIS consulting. Seeking a graduate tax role with structured training.</p>
      <div class="hero-actions">
        <a class="journey-button" href="#education">Start the journey <span aria-hidden="true">↗</span></a>
        <a class="journey-button" href="/cv/Jiyan-Lu-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
        <a class="linkedin-link" href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="Connect with Livia on LinkedIn (opens in a new tab)">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
        </a>
      </div>
      <span class="hero-scroll-hint">Scroll to explore <span aria-hidden="true">↓</span></span>
    </div>
    <div class="hero-world" aria-label="Sculpted globe with international city landmarks">
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
      <div class="polaroid polaroid-one"><div class="scene-fact"><strong>MSc</strong><span>Accounting, Finance &amp; Management</span></div><span class="polaroid-caption">Bristol · 2027</span></div>
      <div class="polaroid polaroid-two"><div class="scene-fact"><strong>9</strong><span>ACCA exams passed</span></div><span class="polaroid-caption">Nanjing · 2023</span></div>
    </div>
    <div class="chapter-content">
      <header class="chapter-heading reveal">
        <div><span class="eyebrow">Stop 01 · Where it began</span><h2 id="education-title">Education</h2><p>Postgraduate study, ACCA foundations, and academic recognition across Bristol and Nanjing.</p></div>
      </header>
      <div class="timeline" aria-label="Education timeline">
        {#each studies as study}
          <article class="timeline-entry reveal"><span class="timeline-date">{study.date}</span><span class="timeline-dot" aria-hidden="true"></span>
            <div class="paper-card"><div class="card-meta"><span class="card-overline">Education</span><span class="inline-date">{study.date}</span></div><h3>{study.title}</h3><strong>{study.place}</strong><ul class="card-points">{#each study.details as detail}<li>{detail}</li>{/each}</ul></div>
          </article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Academic recognition</span><strong>Think Big Career Accelerator Scholarship</strong><p>Awarded at the University of Bristol.</p></div><a href="#work">Next: Work Experience <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="work" aria-labelledby="work-title" style="--chapter-tint:#fff8ec">
    <div class="chapter-scene scene-reversed" aria-hidden="true">
      <span class="scene-label">Stop 02 · Grow</span>
      <img class="road-art road-art-work" src="/assets/journey-clay-road.png" alt="" />
      <span class="scene-dog dog-sprite" class:visible={active === 'work'}></span>
      <div class="polaroid polaroid-one"><div class="scene-fact"><strong>£150k</strong><span>SEIS fundraising strategy</span></div><span class="polaroid-caption">Client consulting</span></div>
      <div class="polaroid polaroid-two"><div class="scene-fact"><strong>150+</strong><span>Page updates delivered</span></div><span class="polaroid-caption">Baozun · Shanghai</span></div>
      <div class="polaroid polaroid-three"><div class="scene-fact"><strong>3</strong><span>IPO audit engagements</span></div><span class="polaroid-caption">RSM China</span></div>
    </div>
    <div class="chapter-content">
      <header class="chapter-heading reveal">
        <div><span class="eyebrow">Stop 02 · Turning knowledge into practice</span><h2 id="work-title">Work Experience</h2><p>Experience across UK tax research, scholarship assessment, e-commerce operations, and IPO audit.</p></div>
      </header>
      <div class="timeline" aria-label="Work experience timeline">
        {#each roles as role}
          <article class="timeline-entry reveal"><span class="timeline-date">{role.date}</span><span class="timeline-dot" aria-hidden="true"></span>
            <div class="paper-card"><div class="card-meta"><span class="card-overline">Work Experience</span><span class="inline-date">{role.date}</span></div><h3>{role.title}</h3><strong>{role.place}</strong><ul class="card-points">{#each role.details as detail}<li>{detail}</li>{/each}</ul></div>
          </article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Client feedback</span><strong>SEIS financing roadmap rated “Excellent”</strong><p>Delivered with a six-member student consulting team.</p></div><a href="#skills">Next: Skills &amp; Strengths <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="skills" aria-labelledby="skills-title" style="--chapter-tint:#eff4e8">
    <div class="chapter-scene" aria-hidden="true"><span class="scene-label">Stop 03 · Shine</span><img class="road-art" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'skills'}></span><div class="polaroid polaroid-one"><div class="scene-fact"><strong>Excel</strong><span>VLOOKUP · Reconciliation</span></div><span class="polaroid-caption">Analysis &amp; reporting</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Stop 03 · What she brings</span><h2 id="skills-title">Skills &amp; Strengths</h2><p>Tax research, financial reporting, data analysis, and clear client communication.</p></div></header>
      <div class="road-stops">
        {#each strengths as strength}
          <article class="paper-card stop-card reveal"><span class="stop-number">{strength.number}</span><h3>{strength.title}</h3><p>{strength.detail}</p></article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Professional foundation</span><strong>Nine ACCA exams passed</strong><p>Building towards complex tax compliance and advisory work.</p></div><a href="#interests">Next: Beyond Work <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="interests" aria-labelledby="interests-title" style="--chapter-tint:#fff0e8">
    <div class="chapter-scene scene-reversed" aria-hidden="true"><span class="scene-label">Stop 04 · Lead</span><img class="road-art road-art-work" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'interests'}></span><div class="polaroid polaroid-one"><div class="scene-fact"><strong>1st</strong><span>Group production simulation</span></div><span class="polaroid-caption">Global finalist</span></div><div class="polaroid polaroid-two"><div class="scene-fact"><strong>Top 8</strong><span>2021 Huaxia Cup</span></div><span class="polaroid-caption">International debate</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Stop 04 · Beyond formal study</span><h2 id="interests-title">Beyond Work</h2><p>Leadership, production strategy, and international debate alongside formal study.</p></div></header>
      <div class="activity-list">
        {#each activities as activity}
          <article class="paper-card reveal"><span class="card-overline">{activity.date}</span><h3>{activity.title}</h3><strong>{activity.place}</strong><ul class="card-points">{#each activity.details as detail}<li>{detail}</li>{/each}</ul></article>
        {/each}
      </div>
      <div class="chapter-trail reveal"><div><span class="card-overline">Global final</span><strong>First Bristol postgraduate team to reach it</strong><p>Production strategy and cross-functional coordination.</p></div><a href="#contact">Next: Contact <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="story-section chapter" id="contact" aria-labelledby="contact-title" style="--chapter-tint:#f4e9dd">
    <div class="chapter-scene" aria-hidden="true"><span class="scene-label">Final stop · Hello</span><img class="road-art" src="/assets/journey-clay-road.png" alt="" /><span class="scene-dog dog-sprite" class:visible={active === 'contact'}></span><div class="polaroid polaroid-one"><div class="scene-fact"><strong>UK / CN</strong><span>Bristol · Jiangsu</span></div><span class="polaroid-caption">Open to graduate tax roles</span></div><div class="scene-stamp contact-stamp">Next stop? <span>♡</span></div></div>
    <div class="chapter-content">
      <header class="chapter-heading reveal"><div><span class="eyebrow">Final stop · Say hello</span><h2 id="contact-title">Let’s Connect</h2><p>Seeking a graduate tax role with structured training and a path towards complex advisory work.</p></div></header>
      <form class="paper-card contact-form reveal" onsubmit={sendMessage}>
        <div class="contact-form-heading">
          <div><span class="card-overline">Contact Livia</span><h3>Let’s start a conversation.</h3></div>
          <a class="linkedin-link" href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="Connect with Livia on LinkedIn (opens in a new tab)">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
          </a>
        </div>
        <p>For graduate tax opportunities, professional introductions, or a conversation about Livia’s experience.</p>
        <input class="honeypot" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <label for="contact-name">Name<input id="contact-name" type="text" name="name" required autocomplete="name" maxlength="80" /></label>
        <label for="contact-email">Email<input id="contact-email" type="email" name="email" required autocomplete="email" /></label>
        <label for="contact-message">Message<textarea id="contact-message" name="message" rows="5" required></textarea></label>
        <button class="journey-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
        <p class="form-notice" class:error={formError} role="status" aria-atomic="true">{formNotice}</p>
        <small>Messages are delivered by Web3Forms.</small>
      </form>
      <div class="chapter-trail reveal"><div><span class="card-overline">Based between</span><strong>Bristol, UK · Jiangsu, China</strong><p>Available for graduate tax opportunities.</p></div><a href="#home">Back to Home <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
</main>
