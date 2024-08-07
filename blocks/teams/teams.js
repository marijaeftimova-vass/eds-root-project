import { fetchTeamsData } from '../../api/usePersistedQueries.js';

const sanitizeName = (name) => name.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]/g, '');

const redirectURL = (name) => `${sanitizeName(name)}?name=${encodeURIComponent(name)}`;

const createErrorElement = (errorMessage) => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = errorMessage;
  return errorDiv;
};

const createTeamMemberElement = (teamMember) => {
  const li = document.createElement('li');
  li.className = 'team-member';

  const link = document.createElement('a');
  link.href = redirectURL(teamMember.fullName);
  link.textContent = teamMember.fullName;

  li.appendChild(link);
  return li;
};

const createTeamElement = (team) => {
  if (!team.title || !team.shortName || !team.teamMembers) {
    return null;
  }

  const teamDiv = document.createElement('div');
  teamDiv.className = 'team';

  const titleH2 = document.createElement('h2');
  titleH2.className = 'team-title';
  titleH2.textContent = team.title;

  const descriptionP = document.createElement('p');
  descriptionP.className = 'team-description';
  descriptionP.textContent = team.description?.plaintext || '';

  const membersTitleH4 = document.createElement('h4');
  membersTitleH4.className = 'team-members-title';
  membersTitleH4.textContent = 'Members';

  const membersUl = document.createElement('ul');
  membersUl.className = 'team-members';

  team.teamMembers.forEach((teamMember) => {
    membersUl.appendChild(createTeamMemberElement(teamMember));
  });

  teamDiv.append(titleH2, descriptionP, membersTitleH4, membersUl);

  return teamDiv;
};

const removeEmptyDivs = (parentElement) => {
  parentElement.querySelectorAll('div').forEach((div) => {
    if (!div.innerHTML.trim()) {
      div.remove();
    }
  });
};

export default async function decorate(block) {
  const container = block.querySelector('div > div');
  container.className = 'teams';

  try {
    const { data, error } = await fetchTeamsData();
    if (error) {
      container.appendChild(createErrorElement(error));
    } else {
      const teams = data?.data?.teamList?.items || [];

      teams.forEach((team) => {
        const teamElement = createTeamElement(team);
        if (teamElement) {
          container.appendChild(teamElement);
        }
      });
    }
  } catch (err) {
    container.appendChild(createErrorElement('An error occurred while fetching data.'));
  }

  removeEmptyDivs(container);
}
