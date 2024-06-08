// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  TeamOutlined,
  AlertOutlined
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
  AlertOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'Management',
  title: 'Management ',
  type: 'group',
  children: [
    
    {
      id: 'My Tutorials',
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
    },
    {
      id: 'Signal',
      title: 'My Signals',
      type: 'item',
      url: '/creator/mysignals',
      icon: icons.AlertOutlined
    }
  ]
};

export default utilities;
