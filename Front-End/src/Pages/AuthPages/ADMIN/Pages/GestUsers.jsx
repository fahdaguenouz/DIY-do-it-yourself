import { CBadge } from '@coreui/react';
import { CAvatar, CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useEffect, useState } from 'react';
import Header from '../Header';
import { getUsers } from '@/Redux/authActions';
import { useDispatch, useSelector } from 'react-redux';
const GestUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
      }, [dispatch]);
    
      const { users, authenticated, loading } = useSelector(state => state.auth);
      const [details, setDetails] = useState([])
      console.log(users);
    const columns = [
      {
        key: 'avatar',
        label: '',
        filter: false,
        sorter: false,
      },
      {
        key: 'name',
        _style: { width: '20%' },
      },
      'registered',
      { 
        key: 'role',
        _style: { width: '20%' }
      },
      { 
        key: 'status',
        _style: { width: '20%' }
      },
      { 
        key: 'status',
        _style: { width: '20%' }
      },
      { 
        key: 'status',
        _style: { width: '20%' }
      },
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
      },
    ]
    const usersData = [
      {
        id: 1,
        name: 'Samppa Nori',
        avatar: '1.jpg',
        registered: '2022/01/01',
        role: 'Member',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Estavan Lykos',
        avatar: '2.jpg',
        registered: '2022/02/07',
        role: 'Staff',
        status: 'Banned',
      },
      {
        id: 3,
        name: 'Chetan Mohamed',
        avatar: '3.jpg',
        registered: '2022/02/07',
        role: 'Admin',
        status: 'Inactive',
        _selected: true,
      },
      {
        id: 4,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2022/03/19',
        role: 'Member',
        status: 'Pending',
      },
      {
        id: 5,
        name: 'Friderik Dávid',
        avatar: '5.jpg',
        registered: '2022/01/21',
        role: 'Staff',
        status: 'Active'
      },
      { 
        id: 6,
        name: 'Yiorgos Avraamu',
        avatar: '6.jpg',
        registered: '2022/01/01',
        role: 'Member',
        status: 'Active'
      },
      {
        id: 7,
        name: 'Avram Tarasios',
        avatar: '7.jpg',
        registered: '2022/02/07',
        role: 'Staff',
        status: 'Banned',
        _selected: true,
      },
      {
        id: 8,
        name: 'Quintin Ed',
        avatar: '8.jpg',
        registered: '2022/02/07',
        role: 'Admin',
        status: 'Inactive'
      },
      { 
        id: 9,
        name: 'Enéas Kwadwo',
        avatar: '9.jpg',
        registered: '2022/03/19',
        role: 'Member',
        status: 'Pending'
      },
      { 
        id: 10,
        name: 'Agapetus Tadeáš',
        avatar: '10.jpg',
        registered: '2022/01/21',
        role: 'Staff',
        status: 'Active'
      },
      { 
        id: 11,
        name: 'Carwyn Fachtna',
        avatar: '11.jpg',
        registered: '2022/01/01',
        role: 'Member',
        status: 'Active'
      },
      {
        id: 12,
        name: 'Nehemiah Tatius',
        avatar: '12.jpg',
        registered: '2022/02/07',
        role: 'Staff',
        status: 'Banned',
        _selected: true,
      },
      {
        id: 13,
        name: 'Ebbe Gemariah',
        avatar: '13.jpg',
        registered: '2022/02/07',
        role: 'Admin',
        status: 'Inactive'
      },
      {
        id: 14,
        name: 'Eustorgios Amulius',
        avatar: '14.jpg',
        registered: '2022/03/19',
        role: 'Member',
        status: 'Pending',
      },
      {
        id: 15,
        name: 'Leopold Gáspár',
        avatar: '15.jpg',
        registered: '2022/01/21',
        role: 'Staff',
        status: 'Active'
      },
    ]
    const getBadge = (status) => {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          return 'primary'
      }
    }
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }
    return (
        <>
       
      <CSmartTable
        activePage={2}
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
          console.log(items)
        }}
        onSelectedItemsChange={(items) => {
          console.log(items)
        }}
        scopedColumns={{
          avatar: (item) => (
            <td>
              <CAvatar src={`/images/avatars/${item.avatar}`} />
            </td>
          ),
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.id)
                  }}
                >
                  {details.includes(item.id) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody className="p-3">
                  <h4>{item.username}</h4>
                  <p className="text-muted">User since: {item.registered}</p>
                  <CButton size="sm" color="info">
                    User Settings
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
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
          className: 'align-middle'
        }}
      />
      </>
    )

}

export default GestUsers;
