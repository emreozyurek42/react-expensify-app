import  {createStore, combineReducers  } from "redux";
import uuid from 'uuid';

const addExpense = ({ description = '', note = '', amount = 0, creaatedAt = 0}={}) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id:uuid(),
      description,
      note,
      amount,
      createdAt
    }
});

const removeExpense = ({id}={}) =>({
       type: 'REMOVE_EXPENSE',
       id
});

const editExpense = (id, updates) => ({
     type: 'EDIT_EXPENSE',
     id,
     updates
});


const expenseReducerDefaulState = [];

const expensesReducer = (state=expenseReducerDefaulState, action) => {
      switch(action.type) {
          case 'ADD_EXPENSE':
            return [
              ...state,
              action.expense
          ];
          case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
          case 'EDIT_EXPENSE':
             return state.map((expense) => {
                if(expense.id ===action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                };
             });
          default:
          return state;
      }
};

const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};


const  filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch(action.type) {
        default:
        return state;
    }
};

const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description:'Rent', amount:100 }));
const expenseTwo = store.dispatch(addExpense({ description:'Cofee', amount:300 }));

store.dispatch(removeExpense({ id:expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, {amount:500}));

const demoState = {
   expenses: [{
       id:'epojfvds',
       description:'January Rent',
       note:"This was the final paynemt for address",
       amount: 54500,
       createdAt: 0
   }],
   filters: {
       text: 'rent',
       sortBy:'amount', //date or amount
       startDate: undefined,
       endDate: undefined
   }
};


