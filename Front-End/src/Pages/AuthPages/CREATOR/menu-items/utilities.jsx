// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  TeamOutlined,
  BookOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  ClusterOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  BookOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'Management',
  title: 'Management ',
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
      id: 'Add Tutorial',
      title: 'Add Tutorial',
      type: 'item',
      url: '/creator/add-tutorial',
      icon: icons.AppstoreAddOutlined
    },
    // {
    //   id: 'SubCategory',
    //   title: 'Analytics',
    //   type: 'item',
    //   url: '/creator/creator-analytics',
    //   icon: icons.ClusterOutlined
    // }
  ]
};

export default utilities;
