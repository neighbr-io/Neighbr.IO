import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TransactionTable from '../Transactions/Transactions';
import { useGetTransactionsQuery } from '../transactionSlice';
import { useMeQuery } from '../authSlice'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function DashboardGrid() {

    const { data: me } = useMeQuery();
    const { data: transactions, error, isLoading } = useGetTransactionsQuery();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <h2>{me?.email}</h2>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                            {transactions && transactions.length > 0 ? (
                                <>
                                    <h3>Recent Contributions</h3>
                                    <TransactionTable transactions={transactions} />
                                </>
                            ) : (
                                <>
                                    <p>Find a project to contribute to.</p>
                                </>
                            )}
                        
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}