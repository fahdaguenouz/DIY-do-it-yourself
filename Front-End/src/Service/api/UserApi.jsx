
import { axiosClient } from './../../api/axios';


const UserApi={
    login: async (email, password) => {
        return axiosClient.post('/login', { email, password });
      },

      // getUserData:()=>{
      //   return axiosClient.get('/user');
      // }
     
}
export default UserApi;