let members = [];

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        members = await response.json();

        displayMembers(members, 'grid');
        
        displaySpotlightMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members, viewType) {
    const container = document.querySelector('.business-grid');
    if (container) {
        container.innerHTML = '';

        members.forEach(member => {
            const memberCard = `
                <div class="business-card">
                    <img src="images/${member.image}" alt="${member.name}">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;

            const listViewCard = `
                <div class="list-view-item">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;

            container.innerHTML += viewType === 'grid' ? memberCard : listViewCard;
        });
    }
}

function getMembershipLevel(level) {
    if (level === 1) return 'Member';
    if (level === 2) return 'Silver Member';
    return 'Gold Member';
}

function displaySpotlightMembers(members) {
    const spotlightContainer = document.querySelector('.spotlight-companies');
    if (spotlightContainer) {
        spotlightContainer.innerHTML = '';

        const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        
        const selectedMembers = getRandomMembers(eligibleMembers, 2 + Math.floor(Math.random() * 2));

        selectedMembers.forEach(member => {
            const memberCard = `
                <div class="business-card">
                    <img src="images/${member.image}" alt="${member.name}">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;
            spotlightContainer.innerHTML += memberCard;
        });
    }
}

function getRandomMembers(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

async function loadWeather() {
    const apiKey = 'be443110b9a6117b5c824c0a74e70561';
    const lat = 18.97;
    const lon = -98.29;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error('Failed to fetch weather data');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const currentWeather = data;
    document.getElementById('temp').textContent = Math.round(currentWeather.main.temp);
    document.getElementById('description').textContent = capitalizeWords(currentWeather.weather[0].description);
    document.getElementById('high').textContent = Math.round(currentWeather.main.temp_max);
    document.getElementById('low').textContent = Math.round(currentWeather.main.temp_min);
    document.getElementById('humidity').textContent = currentWeather.main.humidity;

    const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
    const sunsetTime = new Date(currentWeather.sys.sunset * 1000);

    document.getElementById('sunrise').textContent = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const iconCode = currentWeather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherIcon = document.getElementById('weather-icon');
    if (iconCode) {
        weatherIcon.src = iconUrl;
        weatherIcon.alt = currentWeather.weather[0].description;
        weatherIcon.style.display = 'block';
    }

    const currentDayElement = document.getElementById('current-day');
    if (currentDayElement) {
        const today = new Date();
        currentDayElement.textContent = `${today.toLocaleDateString('en-US', { weekday: 'long' })}, ${today.toDateString()}`;
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.business-grid')) {
        loadMembers();
    }

    if (document.querySelector('.weather-info')) {
        loadWeather();
    }

    const year = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = year;
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav ul');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    if (document.querySelector('.spotlight-companies')) {
        loadMembers();
    }

    const toggleView = document.querySelector('#toggleView');
    if (toggleView) {
        toggleView.addEventListener('click', function () {
            const businessGrid = document.querySelector('.business-grid');

            if (businessGrid) {
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
            }
        });
    }
});