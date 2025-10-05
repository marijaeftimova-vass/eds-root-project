function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

function toggleAccordion(navToggle) {
  navToggle.open = !navToggle.open;
}

export default function decorate(block) {
  const heads = [];
  [...block.children].forEach((row) => {
    const label = row.children[0];
    let type = row.children[1];

    if (type.firstChild) {
      type = document.createElement(type.firstChild.textContent.trim().toLowerCase());
    } else {
      type = document.createElement('h3');
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    type.innerHTML = summary.innerHTML;

    if (!hasWrapper(summary)) {
      summary.innerHTML = '';
      summary.appendChild(type);
    }

    const buttonWithIcon = document.createElement('button');
    buttonWithIcon.classList.add('accordion-button');
    buttonWithIcon.setAttribute('aria-expanded', 'false');
    buttonWithIcon.innerHTML = '<span class="plus-icon" aria-expanded="false"></span>';
    summary.appendChild(buttonWithIcon);

    const body = row.children[2];
    body.className = 'accordion-item-body';

    if (!hasWrapper(body)) {
      body.innerHTML = `<p>${body.innerHTML}</p>`;
    }

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    row.classList.add('accordion-item-container');
    row.innerHTML = '';
    row.append(details);

    const menuTitle = summary.querySelector('button');
    menuTitle.addEventListener('click', () => {
      toggleAccordion(details);
    });

    const target = summary.firstElementChild;
    if (target) heads.push(target);
  });

  const show = (el) => el.classList.add('in-view');

  if (!('IntersectionObserver' in window)) {
    heads.forEach(show);
    return;
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heads.forEach(show);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        show(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  heads.forEach((h) => io.observe(h));
}
