import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';


test('sholud render ExpenseForm correctly', () => {
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();  
});

test('sholud render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();  
 });
 
 test('sholud render error for incorrect submisson', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
 });


 test('sholud set description on input change', () => {
     const value = 'New description'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change' ,{
        target:{value}
    });
    expect(wrapper.state('description')).toBe(value);
 });


 test('sholud set note on textarea', () => {
    const value = 'New note value'
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('textarea').simulate('change' ,{
       target:{value}
   });
   expect(wrapper.state('note')).toBe(value);
});
 
test('sholud set description if valid input', () => {
    const value = '23.50'
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('input').at(1).simulate('change' ,{
       target:{value}
   });
   expect(wrapper.state('amount')).toBe(value);
});

test('sholud set description on if ivalid value', () => {
    const value = '12.222'
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('input').at(1).simulate('change' ,{
       target:{value}
   });
   expect(wrapper.state('amount')).toBe('');
});

test('sholud call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense ={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note:expenses[0].note,
        createdAt: expenses[0].createdAt
    });
    
});

test('should det new date on date cahnge', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});
 

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});










 