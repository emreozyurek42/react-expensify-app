import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpensesDashboardPage = () => (
    <div>
      <ExpenseListFilters />
      <ExpenseList />
    </div>
);

export default ExpensesDashboardPage;