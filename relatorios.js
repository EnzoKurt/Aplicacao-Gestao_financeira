// --- LÓGICA DO DASHBOARD (index.html) ---
const dashCtx = document.getElementById('financeChart');
if (dashCtx) {
    new Chart(dashCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                { label: 'Receitas', data: [4500, 4800, 5200, 4900, 5500, 5800], backgroundColor: '#333', borderRadius: 4, barPercentage: 0.6 },
                { label: 'Despesas', data: [3200, 3500, 3800, 4100, 3900, 4200], backgroundColor: '#aaa', borderRadius: 4, barPercentage: 0.6 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } },
            scales: { y: { beginAtZero: true, grid: { borderDash: [5, 5] } }, x: { grid: { display: false } } }
        }
    });
}

// --- LÓGICA DE RELATÓRIOS (relatorios.html) ---
const pieCtx = document.getElementById('categoryChart');
const barCtx = document.getElementById('evolutionChart');

if (pieCtx && barCtx) {
    // 1. Pizza
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Utilidades', 'Lazer'],
            datasets: [{
                data: [1500, 730, 400, 150, 120, 300],
                backgroundColor: ['#222', '#555', '#888', '#aaa', '#ccc', '#e5e5e5'], borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 2. Barras (Evolução)
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{ label: 'Saldo', data: [1300, 1300, 1400, 800, 1600, 1600], backgroundColor: '#444', borderRadius: 4 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { borderDash: [5, 5] } }, x: { grid: { display: false } } }
        }
    });
}