// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  TeamOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  ClusterOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'Management',
  title: 'Management ',
  type: 'group',
  children: [
    {
      id: 'gestion-users',
      title: 'Users',
      type: 'item',
      url: '/admin/gestion-users',
      icon: icons.TeamOutlined
    },
    {
      id: 'Category',
      title: 'Category',
      type: 'item',
      url: '/admin/gestion-category',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'SubCategory',
      title: 'SubCategory',
      type: 'item',
      url: '/admin/gestion-sub-category',
      icon: icons.ClusterOutlined
    }
  ]
};

export default utilities;
