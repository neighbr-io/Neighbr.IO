import React from 'react';
import { useMeQuery } from './authSlice';

const Dashboard = () => {
  const { data: user } = useMeQuery();
  console.log(user);

  return (
    <div>
      <h1>Transactions</h1>
      <h3>Hi {user}!</h3>
      {/* <TransactionsList userId={userId} projectId={projectId} /> */}
    </div>
  );
};

export default Dashboard;