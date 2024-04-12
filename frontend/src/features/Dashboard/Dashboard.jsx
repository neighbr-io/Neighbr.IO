import React from 'react';
import { useGetTransactionsQuery } from './transactionSlice';
import DashboardGrid from './DashboardGrid/DashboardGrid';

import "../projects/SingleProject.css"

const Dashboard = () => {
  const { data: transactions, error, isLoading } = useGetTransactionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while retrieving data </div>;
  }

  return (
    <div className="transactions">
      <h1>Welcome back Neighbor!</h1>
      <DashboardGrid />
    </div>
  );
};

export default Dashboard;