
import { axiosClient } from './../../api/axios';


const UserApi = {
  login: async (email, password) => {
    return axiosClient.post('/login', { email, password });
  },

  logout: async () => {
    return await axiosClient.post('/logout')
  },

  register: async (Data) => {
    return await axiosClient.post('/register', Data)
  },

  getUsers: async () => {
    return await axiosClient.get('/get-users')
  },
  getLevels: async () => {
    return await axiosClient.get('/get-levels')
  },
  getRoles: async () => {
    return await axiosClient.get('/get-roles')
  },

  Add_User: async (UserData) => {
    // Create FormData instance
    

    return axiosClient.post('/add-user', UserData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },



  updateUser: async (userId, userData) => {
    return axiosClient.put(`/users/update-user/${userId}`, userData);
  },
}
export default UserApi;