const BASE_URL = 'https://publish-p11338-e1404827.adobeaemcloud.com/graphql/execute.json/AEM-EDS-Headless-CMS';

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { data: await response.json(), err: null };
  } catch (e) {
    return { data: null, err: e.message };
  }
}

export async function fetchTeamsData() {
  const url = `${BASE_URL}/all-teams`;

  return fetchData(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function fetchPerson(fullName) {
  const url = `${BASE_URL}/person-by-name`;

  const query = `
    query personByName($name: String!) {
      personList(
        filter: {
          fullName: {
            _expressions: [{ value: $name, _operator: EQUALS }]
          }
        }
      ) {
        items {
          _path
          fullName
          occupation
          biographyText {
            json
          }
          profilePicture {
            ... on ImageRef {
              _path
              _authorUrl
              _publishUrl
              width
              height
            }
          }
        }
      }
    }
  `;

  const requestBody = {
    query,
    variables: { name: fullName },
  };

  return fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}
