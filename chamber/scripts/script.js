let members = [];

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        members = await response.json();

        displayMembers(members, 'grid');
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}


function displayMembers(members, viewType) {
    const container = document.querySelector('.business-grid');
    container.innerHTML = '';

    members.forEach(member => {
        const memberCard = `
            <div class="business-card">
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
            </div>
        `;

        const listViewCard = `
            <div class="list-view-item">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
            </div>
        `;

        container.innerHTML += viewType === 'grid' ? memberCard : listViewCard;
    });
}

function getMembershipLevel(level) {
    if (level === 1) return 'Member';
    if (level === 2) return 'Silver Member';
    return 'Gold Member';
}

document.querySelector('#toggleView').addEventListener('click', function() {
    const businessGrid = document.querySelector('.business-grid');
    
    const isGridView = businessGrid.classList.contains('grid');

    if (isGridView) {
        businessGrid.classList.remove('grid');
        businessGrid.classList.add('list');
        displayMembers(members, 'list');
    } else {
        businessGrid.classList.remove('list');
        businessGrid.classList.add('grid');
        displayMembers(members, 'grid');
    }
});


document.addEventListener('DOMContentLoaded', loadMembers);

document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    document.getElementById('currentYear').textContent = year;

    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
    });
});