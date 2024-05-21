
import { axiosClient } from './../../api/axios';


const UserApi={
    login: async (email, password) => {
        return axiosClient.post('/login', { email, password });
      },

      logout: async () => {
        return await axiosClient.post('/logout')
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
     
}
export default UserApi;