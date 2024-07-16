
document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    const playerList = document.getElementById('playerList');
    const clubFilter = document.getElementById('clubFilter');

    
    const players = JSON.parse(localStorage.getItem('players')) || [];
    displayPlayers(players);

  
    updateClubFilterOptions(players);

    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const club = document.getElementById('club').value;

        const newPlayer = { name, club };
        players.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(players));

        displayPlayers(players);
        updateClubFilterOptions(players);
        playerForm.reset();
    });

    clubFilter.addEventListener('change', () => {
        const selectedClub = clubFilter.value;
        const filteredPlayers = selectedClub === '' ? players : players.filter(player => player.club === selectedClub);
        displayPlayers(filteredPlayers);
    });

    function displayPlayers(players) {
        playerList.innerHTML = '';
        players.forEach((player, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${player.name} - ${player.club}</span>
                <button class="transfer-btn" onclick="transferPlayer(${index})">Transfer</button>
            `;
            playerList.appendChild(li);
        });
    }

    window.transferPlayer = (index) => {
        const newClub = prompt('Enter the new club:');
        if (newClub) {
            players[index].club = newClub;
            localStorage.setItem('players', JSON.stringify(players));
            displayPlayers(players);
            updateClubFilterOptions(players);
        }
    }

    function updateClubFilterOptions(players) {
        const clubs = [...new Set(players.map(player => player.club))];
        clubFilter.innerHTML = '<option value="">All Clubs</option>';
        clubs.forEach(club => {
            const option = document.createElement('option');
            option.value = club;
            option.textContent = club;
            clubFilter.appendChild(option);
        });
    }
});
