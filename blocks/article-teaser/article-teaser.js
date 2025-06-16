export default function decorate(block) {
  const main = block.children[0].children[0];
  const [picture, headline, teaser] = main.children;

  const pictureHolder = document.createElement('div');
  pictureHolder.className = 'article-teaser-picture';
  pictureHolder.append(picture.children[0]);
  main.prepend(pictureHolder);
  picture.remove();

  const contentHolder = document.createElement('div');
  contentHolder.className = 'article-teaser-content';
  contentHolder.append(headline, teaser);
  main.append(contentHolder);
}
