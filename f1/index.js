
const url = '/json/f1.json';
document.body.onload = populate(url);
async function populate(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
    }
    const fullList = await res.json();
    const drivers = fullList.drivers.sort(function(a,b) {
        return a.rank - b.rank;
    });
    const teams = fullList.teams.sort(function(a,b) {
        return a.rank - b.rank;
    });
    addTeams(teams);
    addDrivers(drivers);
}

function addDrivers(obj) {
    const listItem = document.querySelector('.list-drivers');

    obj.forEach(e => {

        const driver = document.createElement('div');
        const driverDetails = document.createElement('div');
        const driverStats = document.createElement('div');
        const driverPos = document.createElement('div');

        driver.className = "driver";
        driverDetails.className = "driver-details"
        driverStats.className = "driver-stats";
        driverPos.className = "driver-pos"

        driver.innerHTML = `
        <div class="driver-pfp"><img src="${e.pfp}"></div>
        `;

        driverDetails.innerHTML = `
            <div class="info-wrapper">
                <div class="info">
                    <div class="driver-car ${e.color}">${e.car}</div><div class="abbr ${e.color}">${e.abbr}</div><div class="flag"><img src="${e.nation}"></div><div class="pts">${e.pts} Points</div>
                </div>
                <div class="break ${e.color}"></div>      
            </div>
            <div class="driver-name">${e.name}</div>
            <div class="driver-pob">${e.pob}</div>
        `;

        for (const key in e.stats) {
            if (e.stats.hasOwnProperty(key)) {
                
                driverStats.innerHTML += `<div class="stats-icon ${key}">${e.stats[key]}</div>`;
            }
        }

        e.gp.forEach(o => {
            driverPos.innerHTML += `<div class="gp ${o}"></div>`
        })

        driverDetails.appendChild(driverStats);
        driverDetails.appendChild(driverPos);

        driver.appendChild(driverDetails);

        listItem.appendChild(driver)
    })
}  

function addTeams(obj) {
    const listItem = document.querySelector('.list-teams');
    obj.forEach(e => {

        const team = document.createElement('div');
        const teamDetails = document.createElement('div');
        const carModel = document.createElement('div');
        const teamDriver = document.createElement('div');

        team.className = "team";
        teamDetails.className = "team-details"
        carModel.className = "car-model";
        teamDriver.className = "team-driver"

        team.innerHTML = `
        <div class="info-wrapper">
            <div class="info"><div class="abbr ${e.color}">${e.abbr}</div><div class="flag"><img src="${e.nation}"></div><div class="pts">25 Points</div></div>
            <div class="break ${e.color}"></div>
            <div class="team-name">${e.name}</div>
        </div>
            <div class="team-pob">${e.pob}</div>
        `;

        e.drivers.forEach(driver => {
            teamDriver.innerHTML += `<div class="seat">
                                        <div class="seat-name ${driver.name}">${driver.name}</div>
                                        <div class="seat-pfp"><img src="${driver.pfp}"></div>
                                    </div>
                                    `;
        })

        carModel.innerHTML = `
            <div class="chasis">${e.chasis}</div>
            <div class="engine">${e.engine}</div>
            <div class="logo"><img src="${e.logo}"></div>   
            <div class="car"><img src="${e.car}"></div>
            `;

        teamDetails.appendChild(carModel);
        teamDetails.appendChild(teamDriver);

        team.appendChild(teamDetails);
        listItem.appendChild(team);
    })
}    