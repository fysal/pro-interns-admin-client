import { combineReducers } from 'redux'
import opportunitiesState from './opportunities.reducer';
import applicationsState from './applications.reducer';
import usersState from './users.reducer';
import employersState from './employers.reducer';
import internsState from './interns.reducer';
import interviewsState from './interviews.reducer';
import shortlistState from './shortlists.reducer';
import subscriptionPlanState from './subscription.plans.reducer';
import transactionsState from './transactions.reducer';

export default combineReducers({
  opportunitiesState,
  applicationsState,
  usersState,
  employersState,
  internsState,
  interviewsState,
  shortlistState,
  subscriptionPlanState,
  transactionsState
});