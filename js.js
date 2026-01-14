document.getElementById('exploreButton').addEventListener('click', function() {
    explorePlanet();
});

document.getElementById('backButton').addEventListener('click', function() {
    showMenu();
});

function explorePlanet() {
    const planets = [
        { name: "Lush Jungle", description: "This planet is filled with vibrant flora and fauna." },
        { name: "Icy Tundra", description: "A cold planet covered in ice and snow." },
        { name: "Arid Desert", description: "A hot, dry planet with vast dunes." }
    ];

    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    document.getElementById('info').innerText = `Welcome to ${randomPlanet.name}! ${randomPlanet.description}`;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('planetInfo').classList.remove('hidden');
}

function showMenu() {
    document.getElementById('planetInfo').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}
