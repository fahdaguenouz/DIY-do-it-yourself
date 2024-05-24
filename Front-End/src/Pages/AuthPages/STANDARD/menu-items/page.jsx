// assets
import { HeartOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  HeartOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'Feed',
  title: 'Feed',
  type: 'group',
  children: [
    {
      id: 'Likes',
      title: 'like',
      type: 'item',
      url: '/tutorials/mylikes',
      icon: icons.HeartOutlined,
      target: true
    },
    {
      id: 'comments',
      title: 'Comments',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
