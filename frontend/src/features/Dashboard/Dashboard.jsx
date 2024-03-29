import React from 'react';
import { useMeQuery } from './authSlice';
import { useGetTransactionsQuery } from './transactionSlice';


const Dashboard = () => {
  const { data: transactions, error, isLoading } = useGetTransactionsQuery();
  console.log("data", transactions);
  const { data: me } = useMeQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !transactions ) {
    return <div>Error occurred while retrieving data </div>;
  }
  return (
    <>
      <h1>Transactions</h1>
      {/* "me" - This isn't working yet... */}
      <h3>Hi {me}!</h3>
      <table className='transactions-table'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Transaction Date</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        {transactions.map((transaction) => (
        <tbody>   
          <td>${transaction.amount}</td>
          <td>{new Date(transaction.createdAt).toDateString()}</td>
          <td>{transaction.paymentMethod}</td>
        </tbody>
        ))}
      </table>
      {/* <TransactionsList userId={userId} projectId={projectId} /> */}
    </>
  );
};

export default Dashboard;