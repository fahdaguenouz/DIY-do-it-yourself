import { CBadge, CSpinner } from '@coreui/react';
import { CAvatar, CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useEffect, useState } from 'react';
import Header from '../Header';
import { getUsers } from '@/Redux/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const roles = [
  { id: 1, name: 'Admin', color: 'primary', icon: 'fas fa-user-shield' },
  { id: 2, name: 'Moderateur', color: 'secondary', icon: 'fas fa-user-cog' },
  { id: 3, name: 'Createur', color: 'warning', icon: 'fas fa-user-edit' },
  { id: 4, name: 'Standard User', color: 'info', icon: 'fas fa-user' },
];

const GestUsers = () => {
  const dispatch = useDispatch();
  
  
  const { users, authenticated, loading } = useSelector(state => state.auth);
  const [details, setDetails] = useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])
  console.log(users);
  const columns = [
    {
      key: 'name',
      label: 'Name',
      _style: { width: '20%' },
    },
    {
      key: 'email',
      label: 'Email',
      _style: { width: '20%' },
    },
    {
      key: 'adresse',
      label: 'Address',
      _style: { width: '20%' },
    },
    {
      key: 'level',
      label: 'Level',
      _style: { width: '20%' },
    },
    {
      key: 'role',
      label: 'Role',
      _style: { width: '20%' },
    },
    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ];
const HandleAjouter=()=>{
  navigate("/admin/gestion-users/ajouter-user")
}
  const getRoleBadgeColor = (roleId) => {
    const role = roles.find(role => role.id === roleId);
    return role ? role.color : 'secondary';
  };

  const getRoleIcon = (roleId) => {
    const role = roles.find(role => role.id === roleId);
    return role ? role.icon : '';
  };

  const usersData = users.map(user => ({
    id: user.id,
    name: `${user.prenom} ${user.nom}`,
    email: user.email,
    adresse: user.adresse,
    level: user.level.name,
    role: user.role.name,
    roleId: user.role.id,
    createdAt:format(new Date(user.created_at), 'PPP')
  }));

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (

    <>
      {loading  ? (
        <div className="text-center">
          <CSpinner color="primary" />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end ">
          <CButton className="btn-outline-primary" onClick={HandleAjouter}>
            Ajouter
          </CButton>
        </div>
          <CSmartTable
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={usersData}
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            onFilteredItemsChange={(items) => {
              console.log(items);
            }}
            onSelectedItemsChange={(items) => {
              console.log(items);
            }}
            scopedColumns={{
              role: (item) => (
                <td>
                  <CBadge color={getRoleBadgeColor(item.roleId)}>
                    <i className={getRoleIcon(item.roleId)} style={{ marginRight: '5px' }}></i>
                    {item.role}
                  </CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-1">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.id);
                      }}
                    >
                      {details.includes(item.id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                );
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.id)}>
                    <CCardBody className="p-1">
                      <h4>{item.name}</h4>
                      <p className="text-muted">User since: {item.createdAt}</p>
                      <CButton size="sm" color="info" onClick={() => navigate(`/admin/gestion-users/update-user/${item.id}`)}>
                        Gestion du role
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
            selectable
            sorterValue={{ column: 'status', state: 'asc' }}
            tableFilter
            tableProps={{
              className: 'add-this-class',
              responsive: true,
              striped: true,
              hover: true,
            }}
            tableBodyProps={{
              className: 'align-middle',
            }}
          />
          </>
      )}
    </>
  );
};

export default GestUsers;