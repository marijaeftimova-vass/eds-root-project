import { fetchPerson } from '../../api/usePersistedQueries.js';
import mapJsonRichText from '../../utils/renderRichText.js';

const BASE_URL = 'https://publish-p11338-e1404827.adobeaemcloud.com';

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function createErrorElement(errorMessage) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = errorMessage;
  return errorDiv;
}

function createPersonImageElement(person) {
  const img = document.createElement('img');
  img.className = 'person__image';
  // eslint-disable-next-line no-underscore-dangle
  img.src = `${BASE_URL}${person.profilePicture._path}`;
  img.alt = `${person.fullName} profile picture`;
  return img;
}

function createPersonOccupationElement(person) {
  const occupationsDiv = document.createElement('div');
  occupationsDiv.className = 'person__occupations';

  person.occupation.forEach((occupation) => {
    const span = document.createElement('span');
    span.className = 'person__occupation';
    span.textContent = occupation;
    occupationsDiv.appendChild(span);
  });

  return occupationsDiv;
}

function createPersonContentElement(person) {
  const contentDiv = document.createElement('div');
  contentDiv.className = 'person__content';

  const fullNameH1 = document.createElement('h1');
  fullNameH1.className = 'person__full-name';
  fullNameH1.textContent = person.fullName;
  contentDiv.appendChild(fullNameH1);

  const biographyDiv = document.createElement('div');
  biographyDiv.className = 'person__biography';
  const fragment = mapJsonRichText(person.biographyText.json);
  biographyDiv.appendChild(fragment);
  contentDiv.appendChild(biographyDiv);

  return contentDiv;
}

function removeEmptyDivs(parentElement) {
  parentElement.querySelectorAll('div').forEach((div) => {
    if (!div.innerHTML.trim()) {
      div.remove();
    }
  });
}

export default async function decorate(block) {
  const personFullName = getQueryParam('name');
  const container = block.querySelector('div > div');
  container.className = 'person';

  try {
    const { data, error } = await fetchPerson(personFullName);

    if (error) {
      container.appendChild(createErrorElement(error));
    } else {
      const person = data?.data?.personList?.items?.[0];
      if (person) {
        container.appendChild(createPersonImageElement(person));
        container.appendChild(createPersonOccupationElement(person));
        container.appendChild(createPersonContentElement(person));
      } else {
        container.appendChild(createErrorElement('Person not found.'));
      }
    }
  } catch (err) {
    container.appendChild(createErrorElement('An error occurred while fetching data.'));
  }

  removeEmptyDivs(container);
}
