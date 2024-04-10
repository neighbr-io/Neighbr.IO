import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useGetTransactionsQuery } from '../transactionSlice';
import { useGetProjectsQuery } from '../../projects/projectSlice';

export default function TransactionTable() {
    const { data: transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useGetTransactionsQuery();
    const { data: projects, isLoading: isLoadingProjects, error: errorProjects } = useGetProjectsQuery();

    const transactionsWithProjectName = React.useMemo(() => {
        if (!transactions || !projects) return [];
    
        return transactions.map((transaction) => ({
            ...transaction,
            projectName: projects.find((project) => project.id === transaction.projectgitId)?.title || "Unknown Project",
        }));
    }, [transactions, projects]);

    if (isLoadingTransactions || isLoadingProjects) {
        return <div>Loading...</div>;
    }
    
    if (errorTransactions || errorProjects) {
        return <div>Error occurred while retrieving data</div>;
    }
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Project Name</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionsWithProjectName.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{transaction.projectName}</TableCell>
                            <TableCell align="right">${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell align="right">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}