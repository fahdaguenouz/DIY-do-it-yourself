// assets
import { HeartOutlined, ProfileOutlined,BookOutlined } from '@ant-design/icons';

// icons
const icons = {
  HeartOutlined,
  ProfileOutlined,
  BookOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'Feed',
  title: 'Feed',
  type: 'group',
  children: [
    {
      id: 'tutorials',
      title: 'tutorials',
      type: 'item',
      url: '/all/category',
      icon: icons.BookOutlined,
      target: true
    },
    {
      id: 'Likes',
      title: 'like',
      type: 'item',
      url: '/creator/tutorials/mylikes',
      icon: icons.HeartOutlined,
      target: true
    },
    {
      id: 'comments',
      title: 'Comments',
      type: 'item',
      url: '/creator/tutorials/mycomments',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
