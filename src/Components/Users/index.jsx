import { useState, useEffect, useRef } from 'react'
import { Col, Row, Divider, Button, Tooltip, Popover, Menu, Modal, message, Popconfirm } from 'antd'
import { QuestionOutlined, SearchOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons'
import axiosHelper from '../../Utilities/axiosHelper'

const Users = () => {
  const [users, getUsers] = useState([])
  const [displayUsers, setDisplayUsers] = useState([])
  const [displayInputWarning, setDisplayInputWarning] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentUserFirstName, updateUserFirstName] = useState('')
  const [currentUserLastName, updateUserLastName] = useState('')
  const [currentUserEmail, updateUserEmail] = useState('')
  const [currentUserPermission, updateUserPermission] = useState(0)
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
      message.success(isNewUser ? `You Have Create A New User ${currentUserFirstName}` : `You Have Save Edit Of User ${currentUserFirstName}`)
      resetInput()
      setIsModalVisible(false)
    }
  }

  // check if input is invalid
  const checkInput = () => {
    if (!currentUserFirstName || !currentUserLastName || currentUserPermission === 0 || !currentUserEmail || !isValidEmail) {
      isInputInvalid.current = true
      setDisplayInputWarning(true)
    } else {
      isInputInvalid.current = false
      setDisplayInputWarning(false)
    }
  }

  // update input warning
  const updateInputWarning = () => {
    // if first name input is valid
    if (currentUserFirstName === '') {
      document.getElementById('first-name-input').style.borderColor = 'orange'
    } else {
      document.getElementById('first-name-input').style.borderColor = '#344148'
    }
    // if last name input is valid
    if (currentUserLastName === '') {
      document.getElementById('last-name-input').style.borderColor = 'orange'
    } else {
      document.getElementById('last-name-input').style.borderColor = '#344148'
    }
    // if permission group not group 0
    if (currentUserPermission === 0) {
      document.getElementById('permission-select').style.borderColor = 'orange'
    } else {
      document.getElementById('permission-select').style.borderColor = '#344148'
    }
    // if email input is valid
    if (currentUserEmail === '' || !isValidEmail) {
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
    setDisplayInputWarning(false)
    isInputInvalid.current = false
  }

  // reset the input/select
  const resetInput = () => {
    updateUserFirstName('')
    updateUserLastName('')
    updateUserPermission(0)
    updateUserEmail('')
  }

  // reset the border color of each input/select
  const resetInputWarning = () => {
    document.getElementById('first-name-input').style.borderColor = '#344148'
    document.getElementById('last-name-input').style.borderColor = '#344148'
    document.getElementById('permission-select').style.borderColor = '#344148'
    document.getElementById('email-input').style.borderColor = '#344148'
  }

  // click the more button, show the menu list
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

  // the footer of the user edit modal
  const modalFooter = (
    <Row className='modal-footer'>
      <Col span={10}>{displayInputWarning ? <div className='warning-text'> Please fill out the required input!</div> : ''}</Col>
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

  // search by keyword function
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

  // componentDidMount
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

  // check if is a valid email
  useEffect(() => {
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    if (reg.test(currentUserEmail)) {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  }, [currentUserEmail])

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
              resetInput()
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
                      updateUserPermission(Math.round(item.id / 2))
                    }}>
                    <MoreOutlined />
                  </Button>
                </Popover>
              </Col>
            </Row>
          ))}
        </div>
      </div>

      <Modal className='user-edit' title={isNewUser ? 'New User' : 'Edit User'} width={420} visible={isModalVisible} closeIcon={<CloseOutlined style={{ color: 'white' }} />} footer={modalFooter} onCancel={handleCancel}>
        <div className='list-section'>
          <p>First Name</p>
          <input id='first-name-input' type='text' placeholder='Enter First Name' value={currentUserFirstName} onChange={(e) => updateUserFirstName(e.target.value)}></input>
          <p>Last Name</p>
          <input id='last-name-input' type='text' placeholder='Enter Last Name' value={currentUserLastName} onChange={(e) => updateUserLastName(e.target.value)}></input>
          <p>Permission Group</p>
          <select id='permission-select' value={currentUserPermission} onChange={(e) => updateUserPermission(e.target.value)}>
            <option value='0' disabled>
              --- Select One ---
            </option>
            <option value='1'>Permission Group One</option>
            <option value='2'>Permission Group Two</option>
            <option value='3'>Permission Group Three</option>
            <option value='4'>Permission Group Four</option>
            <option value='5'>Permission Group Five</option>
          </select>
          <p>
            Email
            {isValidEmail ? '' : <span style={{ color: 'orange', fontSize: '12px' }}> Note: Must Be A Valid Email !</span>}
          </p>
          <input id='email-input' type='email' placeholder='Enter Email Address' value={currentUserEmail} onChange={(e) => updateUserEmail(e.target.value)}></input>
        </div>
      </Modal>
    </div>
  )
}

export default Users
