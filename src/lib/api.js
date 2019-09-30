import axios from 'axios';
import Cookies from 'js-cookie';

const api = () => axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
  withCredentials: true,
});

export const getUser = async () => {
  const user = await api().get('/rest/auth/user', {
    params: { surveyId: process.env.GATSBY_TYPEFORM_SURVEY_ID },
  });
  return user.data;
};

export const getAccessCodeUrl = async (ticketType) => {
  const response = await api().get(`/rest/eventbrite/purchase/${ticketType}`);
  return response.data.url;
};

export const getAccessCode = async (ticketType) => {
  const response = await api().get(`/rest/eventbrite/purchase/${ticketType}`);
  return response.data.code;
};
