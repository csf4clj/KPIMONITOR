async function loadData() {
    const response = await fetch('/data.json');
    const data = await response.json();
    const months = ['Ianuarie','Februarie','Martie','April','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];

    function createChart(ctxId, title, dataset) {
        const ctx = document.getElementById(ctxId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    ...Object.keys(dataset).filter(k => k !== 'TOTAL').map(key => ({
                        label: key,
                        data: dataset[key],
                        backgroundColor: getRandomColor()
                    })),
                    {
                        label: 'TOTAL',
                        data: dataset['TOTAL'],
                        type: 'line',
                        borderColor: '#ffcc00',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { title: { display: true, text: title } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    createChart('outputChart', 'Output', data.Output);
    createChart('urelChart', 'UREL%', data.UREL);
    createChart('pierderiChart', 'Pierderi organizaționale - minute', data.Pierderi);
    createChart('forChart', 'FOR - Manipulare', data.FOR);
}

function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
}

function refreshData() { location.reload(); }

const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    const response = await fetch('/upload', { method: 'POST', body: formData });
    const result = await response.text();
    document.getElementById('uploadStatus').innerText = result;
});

loadData();