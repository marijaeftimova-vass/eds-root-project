import ffetch from '../../scripts/ffetch.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const lang = getMetadata('lang');
  const articles = await ffetch(`/${lang}/query-index.json`).all();
  const placeholders = await ffetch('/placeholders.json').all();

  if (!articles || articles.length === 0) {
    return;
  }

  // delete first element of articles array
  articles.shift();

  block.textContent = '';

  articles.forEach((article) => {
    const main = document.createElement('article');

    const picture = createOptimizedPicture(article.image);
    const pictureHolder = document.createElement('div');
    pictureHolder.className = 'article-teaser-picture';
    const pictureLink = document.createElement('a');
    pictureLink.href = article.path;
    pictureLink.append(picture);
    pictureHolder.append(pictureLink);
    main.append(pictureHolder);

    const contentHolder = document.createElement('div');
    const headline = document.createElement('h2');
    const link = document.createElement('a');
    link.href = article.path;
    link.textContent = article.title;

    headline.append(link);

    const description = document.createElement('p');
    description.textContent = article.description;

    const readMoreLink = document.createElement('a');
    readMoreLink.textContent = placeholders['read-more'] || 'continue reading';
    readMoreLink.href = article.path;
    readMoreLink.className = 'article-readmore';

    contentHolder.append(headline, description, readMoreLink);
    contentHolder.className = 'article-teaser-content';

    main.append(contentHolder);
    main.href = article.url;
    block.append(main);
  });
}
