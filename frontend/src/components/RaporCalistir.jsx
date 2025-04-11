import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Chart.js bileşenlerini kaydedin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RaporCalistir = () => {
    const [dofs, setDofs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/dofs')
            .then((response) => response.json())
            .then((data) => setDofs(data))
            .catch((error) => console.error('Error fetching DOFs:', error));
    }, []);

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dofs);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DOFs');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'DOF_Raporu.xlsx');
    };

    const chartData = {
        labels: [...new Set(dofs.map((dof) => dof.department))], // Departman isimleri
        datasets: [
            {
                label: 'DÖF Sayısı',
                data: [...new Set(dofs.map((dof) => dof.department))].map(
                    (department) => dofs.filter((dof) => dof.department === department).length
                ),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Rapor Çalıştır
            </Typography>
            <Typography variant="body1" gutterBottom>
                Tüm DÖF'lerin raporunu aşağıdaki tablo ve grafik üzerinden inceleyebilir ve Excel olarak dışa aktarabilirsiniz.
            </Typography>

            {/* Tablo */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Konu</TableCell>
                        <TableCell>Mesaj</TableCell>
                        <TableCell>Departman</TableCell>
                        <TableCell>Durum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dofs.map((dof) => (
                        <TableRow key={dof.id}>
                            <TableCell>{dof.id}</TableCell>
                            <TableCell>{dof.subject}</TableCell>
                            <TableCell>{dof.message}</TableCell>
                            <TableCell>{dof.department}</TableCell>
                            <TableCell>{dof.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Grafik */}
            <div style={{ marginTop: '20px' }}>
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>

            {/* Excel'e Aktar */}
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleExportToExcel}
            >
                Excel Olarak Aktar
            </Button>
        </Container>
    );
};

export default RaporCalistir;