import React from 'react';
import { useGetTransactionsQuery } from './transactionSlice';
import { useGetAccountDetailsQuery } from './userSlice';
import { useGetProjectQuery } from '../projects/projectSlice';
import TransactionTable from './Transactions/Transactions'; // Ensure this path is correct

const Dashboard = () => {
  const { data: transactions, error, isLoading } = useGetTransactionsQuery();
  const { data: me } = useGetAccountDetailsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while retrieving data </div>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <h3>Hi {me?.email}!</h3>
      {transactions && transactions.length > 0 ? (
        <TransactionTable transactions={transactions} />
      ) : (
        <p>There are no transactions</p>
      )}
    </div>
  );
};

export default Dashboard;