import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_ENDPOINT });

export const getAllOpportunities = () => API.get("/api/v1/opportunities/all");


//Applications  endpoints
export const getAllApplications = () => API.get('/api/v1/applications/all');

export const getAllEmployer = () => API.get('/api/v1/employers/all');

export const getAllInterns = () => API.get('/api/v1/interns/all');

export const getAllInterviews = () => API.get('/api/v1/interviews/all');

export const getAllShortlists = () => API.get('/api/v1/shortlist/all');

//Subscription plans endpoints
export const getAllSubscriptionPlans = () => API.get('/api/v1/subscription-plans/all');

//Transcations endpoints
export const getAllTransactions = () => API.get('/api/v1/transactions/all');