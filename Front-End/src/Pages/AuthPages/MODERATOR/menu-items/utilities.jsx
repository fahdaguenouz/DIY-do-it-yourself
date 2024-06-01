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
      id: 'Signals',
      title: 'Signals',
      type: 'item',
      url: '/moderator/signals',
      icon: icons.TeamOutlined
    },
    {
      id: 'Signals Tutorials',
      title: 'Signals tutorials',
      type: 'item',
      url: '/moderator/signals/tutorials',
      icon: icons.TeamOutlined
    },
    
    
  ]
};

export default utilities;
