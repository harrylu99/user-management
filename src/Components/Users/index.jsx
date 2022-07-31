import { useState, useEffect, useRef } from 'react'
import { Col, Row, Divider, Button, Tooltip, Popover, Menu, Modal, message, Popconfirm } from 'antd'
import { QuestionOutlined, SearchOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons'
import axiosHelper from '../../Utilities/axiosHelper'

const Users = () => {
  const [users, getUsers] = useState([])
  const [displayUsers, setDisplayUsers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentUserFirstName, updateUserFirstName] = useState('')
  const [currentUserLastName, updateUserLastName] = useState('')
  const [currentUserEmail, updateUserEmail] = useState('')

  const isInputInvalid = useRef(false)

  const confirmDelete = () => {
    message.success('Click on Yes')
  }

  const cancelDelete = () => {
    message.error('Click on No')
  }

  // click ok button on modal
  const handleOk = () => {
    checkInput()
    updateInputWarning()
    if (isInputInvalid.current) {
      return
    } else {
      message.success(isNewUser ? 'You Have Create A New User' : 'You Have Save Edit')
      resetInput()
      setIsModalVisible(false)
    }
  }

  // check if input is invalid
  const checkInput = () => {
    if (!currentUserFirstName || !currentUserLastName || !currentUserEmail) {
      isInputInvalid.current = true
    } else {
      isInputInvalid.current = false
    }
  }

  // update input warning
  const updateInputWarning = () => {
    // if first name input is valid
    if (!currentUserFirstName) {
      document.getElementById('first-name-input').style.borderColor = 'orange'
    } else {
      document.getElementById('first-name-input').style.borderColor = '#344148'
    }
    // if last name input is valid
    if (!currentUserLastName) {
      document.getElementById('last-name-input').style.borderColor = 'orange'
    } else {
      document.getElementById('last-name-input').style.borderColor = '#344148'
    }
    // if email input is valid
    if (!currentUserEmail) {
      document.getElementById('email-input').style.borderColor = 'orange'
    } else {
      document.getElementById('email-input').style.borderColor = '#344148'
    }
  }

  // click cancel button on modal
  const handleCancel = () => {
    resetInput()
    resetInputWarning()
    setIsModalVisible(false)
    isInputInvalid.current = false
  }

  const resetInput = () => {
    updateUserFirstName('')
    updateUserLastName('')
    updateUserEmail('')
  }

  const resetInputWarning = () => {
    document.getElementById('first-name-input').style.borderColor = '#344148'
    document.getElementById('last-name-input').style.borderColor = '#344148'
    document.getElementById('email-input').style.borderColor = '#344148'
  }

  // Click the more button, show the menu list
  const content = (
    <Menu
      items={[
        {
          label: (
            <div
              onClick={() => {
                setIsModalVisible(true)
                setIsNewUser(false)
              }}>
              Edit User
            </div>
          )
        },
        {
          label: (
            <div>
              <Popconfirm
                title={() => <div style={{ color: 'white' }}>Are you sure to delete this user?</div>}
                onConfirm={confirmDelete}
                okText='Yes'
                okButtonProps={{
                  style: {
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px white solid'
                  }
                }}
                onCancel={cancelDelete}
                cancelButtonProps={{
                  style: { color: 'white', backgroundColor: 'transparent' }
                }}
                cancelText='No'
                color='#15202a'>
                Remove User
              </Popconfirm>
            </div>
          )
        }
      ]}
      selectable={false}
    />
  )

  const modalFooter = (
    <Row className='modal-footer'>
      <Col span={10}>
        <div className='warning-text'>{isInputInvalid.current === true ? 'Please fill out the required input!' : ''}</div>
      </Col>
      <Col span={14}>
        <Button className='cancel-button' onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button className='ok-button' onClick={() => handleOk()}>
          {isNewUser ? 'Create' : 'Save Edit'}
        </Button>
      </Col>
    </Row>
  )

  const searchByKeyword = () => {
    const keyword = document.getElementById('search-input').value
    setSearchKeyword(keyword)

    let arr = []
    for (let i = 0; i < users.length; i++) {
      if (users[i].name.indexOf(keyword) >= 0 || users[i].username.indexOf(keyword) >= 0 || users[i].phone.indexOf(keyword) >= 0 || users[i].email.indexOf(keyword) >= 0) {
        arr.push(users[i])
      }
    }

    setDisplayUsers(arr)
  }

  useEffect(() => {
    async function fetchData() {
      const rep = await axiosHelper.axiosGet('https://jsonplaceholder.typicode.com/users')
      if (!rep.success) {
        alert(rep.data)
      } else {
        getUsers(rep.data)
        setDisplayUsers(rep.data)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='users-page'>
      <Row>
        <Col className='page-title' span={6}>
          User Management Page{' '}
          <Tooltip title='you can manage user in this page'>
            <Button ghost size='small' shape='circle' icon={<QuestionOutlined />} />
          </Tooltip>
        </Col>
        <Col className='create-new-button' span={6} offset={12}>
          <Button
            type='primary'
            onClick={() => {
              setIsModalVisible(true)
              setIsNewUser(true)
              updateUserFirstName('')
              updateUserLastName('')
              updateUserEmail('')
            }}
            style={{ backgroundColor: '#01A341', borderColor: '#01A341' }}>
            Create New
          </Button>
        </Col>
      </Row>

      <Divider className='divider-line' />

      <div className='search-container'>
        <SearchOutlined className='search-icon' />
        <input id='search-input' className='search-input' type='text' placeholder='Search Keyword (Be Careful! Case Sensitive)' value={searchKeyword} onChange={() => searchByKeyword()} />
      </div>

      <div className='user-list'>
        <div className='list-title'>
          <Row>
            <Col span={6}>User Name</Col>
            <Col span={5}>Group(username)</Col>
            <Col span={6}>Pemissions(phone)</Col>
            <Col span={6}>Email</Col>
            <Col span={1}></Col>
          </Row>
        </div>

        <div>
          {displayUsers.map((item, index) => (
            <Row className='user-item' key={index}>
              <Col span={6}>{item.name}</Col>
              <Col span={5}>{item.username}</Col>
              <Col span={6}>{item.phone}</Col>
              <Col span={6}>{item.email}</Col>
              <Col span={1}>
                <Popover color='#15202a' placement='left' content={content} trigger='hover'>
                  <Button
                    ghost
                    className='more-button'
                    onClick={() => {
                      updateUserFirstName(item.name.split(' ')[0])
                      updateUserLastName(item.name.split(' ')[1])
                      updateUserEmail(item.email)
                    }}>
                    <MoreOutlined />
                  </Button>
                </Popover>
              </Col>
            </Row>
          ))}
        </div>
      </div>

      {/* {modalVisible ? (
        <UserUpdateModal
          currentUser={currentUser}
          isNewUser={isNewUser}
          getVisible={getVisibleFromModal}
        />
      ) : null} */}

      <Modal className='user-edit' title={isNewUser ? 'New User' : 'Edit User'} width={420} visible={isModalVisible} closeIcon={<CloseOutlined style={{ color: 'white' }} />} footer={modalFooter} onCancel={handleCancel}>
        <div className='list-section'>
          <p>First Name</p>
          <input id='first-name-input' type='text' placeholder='Enter First Name' value={currentUserFirstName} onChange={(e) => updateUserFirstName(e.target.value)}></input>
          <p>Last Name</p>
          <input id='last-name-input' type='text' placeholder='Enter Last Name' value={currentUserLastName} onChange={(e) => updateUserLastName(e.target.value)}></input>
          <p>Permission Group</p>
          <input></input>
          <p>Email</p>
          <input id='email-input' type='email' placeholder='Enter Email Address' value={currentUserEmail} onChange={(e) => updateUserEmail(e.target.value)}></input>
        </div>
      </Modal>
    </div>
  )
}

export default Users
