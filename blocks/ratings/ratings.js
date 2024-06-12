import { createOptimizedPicture } from '../../scripts/aem.js';

function isRatingElement(element) {
  const content = element.innerHTML;
  const regex = /^(\d+)\/\d+$/;

  const match = content.match(regex);

  return match ? parseInt(match[1], 10) : null;
}

function isQuoteElement(element) {
  const emChild = element.querySelector('em');

  return emChild !== null;
}

function decorateImage(ratingImageContainer) {
  ratingImageContainer.classList.add('ratings-rating-image');

  ratingImageContainer.querySelectorAll('img').forEach(
    (img) => img.closest('picture')
      .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]))
  );
}

function decorateReview(ratingReviewContainer) {
  ratingReviewContainer.classList.add('ratings-rating-review');

  [...ratingReviewContainer.children].forEach((reviewChild) => {

    if(isQuoteElement(reviewChild)) {
      reviewChild.classList.add('quote');
    }

    const ratingCount = isRatingElement(reviewChild)
    if(ratingCount != null) {
      reviewChild.textContent = '';

      reviewChild.classList.add('ratingStars');

      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');

        if (i < ratingCount) {
          star.className = 'star-active';
        } else {
          star.className = 'star-inactive';
        }

        reviewChild.appendChild(star);
      }
    }
  });
}

export default function decorate(block) {
  [...block.children].forEach((rating) => {
    rating.classList.add('rating');

    decorateImage(rating.children[0]);
    decorateReview(rating.children[1]);

  });
}
