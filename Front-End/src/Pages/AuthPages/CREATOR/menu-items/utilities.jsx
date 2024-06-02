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
      id: 'SubCategory',
      title: 'My tutorials',
      type: 'item',
      url: '/creator/gestion-tutorials',
      icon: icons.ClusterOutlined
    },
    {
      id: 'Add Tutorial',
      title: 'Add Tutorial',
      type: 'item',
      url: '/creator/add-tutorial',
      icon: icons.AppstoreAddOutlined
    }
  ]
};

export default utilities;
