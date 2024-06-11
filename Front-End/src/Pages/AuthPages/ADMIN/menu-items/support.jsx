import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  ClusterOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  TeamOutlined,
  AlertOutlined,
  ExclamationCircleOutlined
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
  AlertOutlined,
  ExclamationCircleOutlined
};

// ==============================|| MENU ITEMS - signal ||============================== //

const Signal = {
  id: 'Signals',
  title: 'Signals',
  type: 'group',
  children: [
    {
      id: 'Signals',
      title: 'Signals',
      type: 'item',
      url: '/admin/signals',
      icon: icons.AlertOutlined
    },
    {
      id: 'Signals Tutorials',
      title: 'Signals Tutorials',
      type: 'item',
      url: '/admin/signals/tutorials',
      icon: icons.ExclamationCircleOutlined
    },
  ]
};

export default Signal;
