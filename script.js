const ctx = document.getElementById('financeChart').getContext('2d');

const financeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Receitas',
                data: [4500, 4800, 5200, 4900, 5500, 5800],
                backgroundColor: '#333', // Cor escura (igual à imagem)
                borderRadius: 4,
                barPercentage: 0.6,
            },
            {
                label: 'Despesas',
                data: [3200, 3500, 3800, 4100, 3900, 4200],
                backgroundColor: '#aaa', // Cor cinza (igual à imagem)
                borderRadius: 4,
                barPercentage: 0.6,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom', // Legenda embaixo
                labels: {
                    usePointStyle: true,
                    boxWidth: 8
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    borderDash: [5, 5] // Linhas pontilhadas no fundo
                }
            },
            x: {
                grid: {
                    display: false // Remove as grades verticais
                }
            }
        }
    }
});