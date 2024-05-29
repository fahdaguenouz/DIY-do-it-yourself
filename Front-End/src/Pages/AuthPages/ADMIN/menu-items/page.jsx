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
      id: 'tutorials',
      title: 'tutorials',
      type: 'item',
      url: '/category',
      icon: icons.HeartOutlined,
      target: true
    },
    {
      id: 'Likes',
      title: 'like',
      type: 'item',
      url: '/admin/tutorials/mylikes',
      icon: icons.HeartOutlined,
      target: true
    },
    {
      id: 'comments',
      title: 'Comments',
      type: 'item',
      url: '/admin/tutorials/mycomments',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
