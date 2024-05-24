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
      id: 'Tutorials',
      title: 'Tutorials',
      type: 'item',
      url: '/creator/gestion-tutorials',
      icon: icons.TeamOutlined
    },
    {
      id: 'Add Tutorial',
      title: 'Add Tutorial',
      type: 'item',
      url: '/creator/add-tutorial',
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
