async function startDraw() {
    const selectedPerson  = document.getElementById('personSelect').value;
    const resultDiv = document.getElementById('result');

    if (!selectedPerson) {
        resultDiv.textContent = 'Mój drogi! Proszę wskaż kim jesteś!';
        return;
    }

    try {
        const drawButton = document.quwerySelector('button');
        drawButton.disabled = true;

        const response = await fetch('.get_availabe_friends');
        const availableFriends = await response.json();

        const possibleDraws = availableFriends.filter(friend.friend_name !== selectedPerson);

        let counter = 0;
        const animationInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * possibleDraws.length);
            resultDiv.textContent = possibleDraws[randomIndex].friend_name;
            counter++;

            if (counter >= 20) {
                clearInterval(animationInterval);
                performFinalDraw();
            }
        }, 100);

        async function performFinalDraw() {
            const finalIndex = Math.floor(Math.random() * possibleDraws.length);
            const drawPerson = possibleDraws[finalIndex];

            const deleteResponse = await fetch('delete_friend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friend: drawPerson.id})
            });

            if (deleteResponse.ok) {
                resultDiv.innerHTML = `<strong>${selectedPerson} wylosował(a):</strong><br><span style="color: green; font-size: 24px;"> ${drawnPerson.friend_name}</span>`;
            } else {
                resultDiv.textContent = 'Losowanie dobiegło końca!';
            }
        }
    } catch (error) {
        console.error(error);
        resultDiv.textContent = 'Losowanie już dobiegło końca!';
    }
}