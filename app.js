(function () {
  const deck = document.getElementById('deck');
  const slidesData = Array.isArray(window.slides) ? window.slides : [];

  const html = slidesData
    .map((slide, index) => renderSlide(slide, index))
    .join('');

  deck.innerHTML = html;

  const slideElements = Array.from(deck.querySelectorAll('.slide'));
  const progressBar = document.querySelector('#progress span');
  let activeIndex = 0;
  let activeVideo = null;
  let pendingVideo = null;

  function renderSlide(slide, index) {
    const slideNumber = renderSlideNumber(index);

    switch (slide.type) {
      case 'title':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div>
              ${renderTagline(slide.tagline)}
              <h1>${slide.title}</h1>
              ${renderSubtitle(slide.subtitle)}
            </div>
            ${slide.hero ? `<div class="hero"><p>${slide.hero}</p></div>` : ''}
          </section>
        `;
      case 'standard':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div>
              ${renderTagline(slide.tagline)}
              <h2>${slide.title}</h2>
              ${renderSubtitle(slide.subtitle)}
            </div>
            ${renderParagraph(slide.description)}
          </section>
        `;
      case 'list':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div>
              ${renderTagline(slide.tagline)}
              <h2>${slide.title}</h2>
              ${renderSubtitle(slide.subtitle)}
            </div>
            ${renderParagraph(slide.description)}
            ${renderList(slide.bullets)}
          </section>
        `;
      case 'timeline':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div>
              ${renderTagline(slide.tagline)}
              <h2>${slide.title}</h2>
              ${renderParagraph(slide.description)}
            </div>
            ${renderTimeline(slide.timeline)}
          </section>
        `;
      case 'cards':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div>
              ${renderTagline(slide.tagline)}
              <h2>${slide.title}</h2>
              ${renderParagraph(slide.description)}
            </div>
            <div class="grid two cards-layout">
              ${Array.isArray(slide.cards) ? slide.cards.map(renderCard).join('') : ''}
              ${renderMedia(slide.media)}
            </div>
          </section>
        `;
      case 'demo':
        return `
          <section class="slide" data-index="${index}">
            ${slideNumber}
            <div class="demo-flow">
              <div class="demo-column">
                ${renderTagline(slide.tagline)}
                <h2>${slide.title}</h2>
                ${renderPrompts(slide.bullets)}
              </div>
              ${renderMedia(slide.media, slide.mediaNote)}
            </div>
          </section>
        `;
      case 'cta':
        return `
          <section class="slide cta-slide" data-index="${index}">
            ${slideNumber}
            ${renderCtaLayout(slide)}
          </section>
        `;
      default:
        return '';
    }
  }

  function renderTagline(tagline) {
    return tagline ? `<div class="tagline">${tagline}</div>` : '';
  }

  function renderSlideNumber(index) {
    const total = slidesData.length;
    const current = String(index + 1).padStart(2, '0');
    return `<div class="slide-number" aria-label="Slide ${index + 1} of ${total}">${current}</div>`;
  }

  function renderSubtitle(text) {
    return text ? `<p class="subtitle">${text}</p>` : '';
  }

  function renderParagraph(text) {
    return text ? `<p>${text}</p>` : '';
  }

  function renderList(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return '';
    }

    const listItems = items.map(item => `<li>${item}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }

  function renderPrompts(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return '';
    }

    const promptItems = items
      .map((item, index) => {
        const idx = String(index + 1).padStart(2, '0');
        return `
          <li>
            <span class="prompt-index">${idx}</span>
            <div class="prompt-text">${item}</div>
          </li>
        `;
      })
      .join('');

    return `<ol class="prompt-list">${promptItems}</ol>`;
  }

  function renderTimeline(steps) {
    if (!Array.isArray(steps) || steps.length === 0) {
      return '';
    }

    const content = steps
      .map(step => `<div class="timeline-step" data-label="${step.label}"><p>${step.text}</p></div>`)
      .join('');

    return `<div class="timeline">${content}</div>`;
  }

  function renderCard(card) {
    const headline = card.headline ? `<strong>${card.headline}</strong>` : '';
    const body = card.body ? `<p>${card.body}</p>` : '';
    const list = renderList(card.items);
    const prompts = Array.isArray(card.prompts)
      ? card.prompts.map(prompt => `<p>${prompt}</p>`).join('')
      : '';

    return `<div class="card">${headline}${body}${list}${prompts}</div>`;
  }

  function renderCtaLayout(slide) {
    const linkMarkup = slide.linkText
      ? `<p class="cta-note">${slide.linkText}</p>`
      : '';

    const content = `
      <div class="cta-content">
        ${renderTagline(slide.tagline)}
        <h2>${slide.title}</h2>
        ${renderList(slide.bullets)}
        ${linkMarkup}
      </div>
    `;

    const media = renderMedia(slide.media, null, 'cta-media');

    if (!media) {
      return content;
    }

    return `
      <div class="cta-layout">
        ${content}
        ${media}
      </div>
    `;
  }

  function renderMedia(media, placeholderText, className) {
    const classes = ['media-block'];
    if (className) {
      classes.push(className);
    }

    if (media && typeof media === 'object') {
      if (media.type === 'video' && media.src) {
        const poster = media.poster ? ` poster="${media.poster}"` : '';
        const autoplay = media.autoplay ? ' autoplay muted playsinline' : '';
        const loop = media.loop ? ' loop' : '';
        const controls = media.controls === false ? '' : ' controls';
        const preload = media.preload === 'none' ? ' preload="none"' : ' preload="metadata"';
        const caption = media.caption ? `<p class="media-caption">${media.caption}</p>` : '';

        return `
          <div class="${classes.join(' ')}">
            <video src="${media.src}"${poster}${controls}${autoplay}${loop}${preload}></video>
            ${caption}
          </div>
        `;
      }
      if (media.type === 'image' && media.src) {
        const alt = media.alt ? media.alt : '';
        const caption = media.caption ? `<p class="media-caption">${media.caption}</p>` : '';

        return `
          <div class="${classes.join(' ')}">
            <img src="${media.src}" alt="${alt}" loading="lazy" />
            ${caption}
          </div>
        `;
      }
    }

    if (!placeholderText) {
      return '';
    }

    classes.push('media-placeholder');
    return `<div class="${classes.join(' ')}"><p>${placeholderText}</p></div>`;
  }

  function showSlide(index) {
    const clamped = Math.max(0, Math.min(index, slideElements.length - 1));
    if (clamped === activeIndex) {
      return;
    }

    const currentSlide = slideElements[activeIndex];
    const nextSlide = slideElements[clamped];

    if (currentSlide) {
      resetSlideMedia(currentSlide);
      currentSlide.classList.remove('active');
    }

    if (nextSlide) {
      nextSlide.classList.add('active');
      prepareSlideVideo(nextSlide);
    }

    activeIndex = clamped;
    updateProgress();
  }

  function updateProgress() {
    if (!progressBar) {
      return;
    }

    const ratio = slideElements.length ? ((activeIndex + 1) / slideElements.length) * 100 : 0;
    progressBar.style.width = `${ratio}%`;
  }

  function startPendingVideo() {
    if (!pendingVideo) {
      return false;
    }

    const video = pendingVideo;
    pendingVideo = null;
    startVideoPlayback(video);
    return true;
  }

  function nextSlide() {
    if (startPendingVideo()) {
      return;
    }

    showSlide(activeIndex + 1);
  }

  function previousSlide() {
    showSlide(activeIndex - 1);
  }

  function goTo(index) {
    showSlide(index);
  }

  function exitFullscreen() {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function resetSlideMedia(slide) {
    if (!slide) {
      return;
    }

    const videos = slide.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (error) {
        // Ignore seek errors while resetting playback position.
      }
    });

    if (document.fullscreenElement && slide.contains(document.fullscreenElement)) {
      exitFullscreen();
    }

    if (pendingVideo && slide.contains(pendingVideo)) {
      pendingVideo = null;
    }

    if (activeVideo && slide.contains(activeVideo)) {
      activeVideo = null;
    }
  }

  function prepareSlideVideo(slide) {
    if (!slide) {
      exitFullscreen();
      activeVideo = null;
      pendingVideo = null;
      return;
    }

    const video = slide.querySelector('video');
    if (!video) {
      exitFullscreen();
      activeVideo = null;
      pendingVideo = null;
      return;
    }

    pendingVideo = video;
    activeVideo = video;

    if (typeof video.pause === 'function') {
      video.pause();
    }

    if (typeof video.currentTime === 'number') {
      try {
        video.currentTime = 0;
      } catch (error) {
        // Swallow errors when resetting playback.
      }
    }
  }

  function startVideoPlayback(video) {
    if (!video) {
      return;
    }

    activeVideo = video;

    if (typeof video.currentTime === 'number') {
      try {
        video.currentTime = 0;
      } catch (error) {
        // Ignore seek errors triggered by resetting playback.
      }
    }

    if (typeof video.requestFullscreen === 'function') {
      const request = video.requestFullscreen();
      if (request && typeof request.catch === 'function') {
        request.catch(() => {});
      }
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        previousSlide();
        break;
      case 'Home':
        goTo(0);
        break;
      case 'End':
        goTo(slideElements.length - 1);
        break;
      default:
        break;
    }
  });

  if (slideElements[0]) {
    slideElements[0].classList.add('active');
    prepareSlideVideo(slideElements[0]);
  }

  updateProgress();
})();
