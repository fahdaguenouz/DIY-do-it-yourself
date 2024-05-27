
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
  getCategory: async () => {
    return await axiosClient.get('/get-categories')
  },
  getTutorials: async () => {
    return await axiosClient.get('/get-tutorials')
  },
  

  Add_User: async (UserData) => {
    // Create FormData instance
    

    return axiosClient.post('/add-user', UserData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  addTutorial : async (formData) => {
  
        return  await axiosClient.post(`/add-tutorial`, formData, {
            headers: {
                
                'Content-Type': 'multipart/form-data',
            },
        });
},


addCategory : async (formData) => {
  
  return  await axiosClient.post(`/add-category`, formData, {
      headers: {
          
          'Content-Type': 'multipart/form-data',
      },
  });
},

updateTutorial : async (tutorialId,formData) => {
  
  return  await axiosClient.put(`/tutorials/update-tutorial/${tutorialId}`, formData, {
      headers: {
          
          'Content-Type': 'multipart/form-data',
      },
  });
},







  updateUser: async (userId, userData) => {
    return axiosClient.put(`/users/update-user/${userId}`, userData,{
      headers: {
          
          'Content-Type': 'multipart/form-data',
      },
  });
  },
}
export default UserApi;