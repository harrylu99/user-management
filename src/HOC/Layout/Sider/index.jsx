import React, { useState } from 'react'
import { Layout, Menu, Avatar, Col, Row, Button } from 'antd'
import {
  HomeOutlined,
  AimOutlined,
  SwapOutlined,
  GoldOutlined,
  AccountBookOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  AlertOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import compacOnlineLogo from '../../../Resources/images/compaconline-logo.png'
import bpLogo from '../../../Resources/images/bp-logo.png'

const Sider = () => {
  const { Sider } = Layout
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider
      className='sider'
      width={'17vw'}
      trigger={null}
      collapsible
      collapsed={collapsed}>
      {collapsed ? (
        <span></span>
      ) : (
        <div className='logo'>
          <img width='150px' height='25px' src={compacOnlineLogo} alt='logo' />{' '}
        </div>
      )}
      <Menu theme='dark' mode='inline' defaultOpenKeys={['userManagement']}>
        <Menu.Item key='home' icon={<HomeOutlined />}>
          <Link to='/uc'>Home</Link>
        </Menu.Item>
        <Menu.Item key='sites' icon={<AimOutlined />}>
          <Link to='/uc'>Sites</Link>
        </Menu.Item>
        <Menu.Item key='transactions' icon={<SwapOutlined />}>
          <Link to='/uc'>Transactions</Link>
        </Menu.Item>
        <Menu.Item key='products' icon={<GoldOutlined />}>
          <Link to='/uc'>Products</Link>
        </Menu.Item>
        <Menu.Item key='priceSchedules' icon={<AccountBookOutlined />}>
          <Link to='/uc'>Price Schedules</Link>
        </Menu.Item>
        <Menu.Item key='cards' icon={<CreditCardOutlined />}>
          <Link to='/uc'>Cards</Link>
        </Menu.Item>
        <Menu.SubMenu
          key='userManagement'
          title='User Management'
          icon={<UserSwitchOutlined />}>
          <Menu.Item key='users' icon={<UserOutlined />}>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='groups' icon={<UsergroupAddOutlined />}>
            <Link to='/uc'>Groups</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key='alarms' icon={<AlertOutlined />}>
          <Link to='/uc'>Alarms</Link>
        </Menu.Item>
      </Menu>
      <div className='menu-footer'>
        {collapsed ? (
          <Button
            ghost
            size='small'
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <Row>
            <Col className='user-avatar' span={4}>
              <Avatar src={bpLogo} />
            </Col>
            <Col className='user-info' span={16}>
              <div className='user-company'>BP New Zealand</div>
              <div className='user-name'>Glen Ruby</div>
            </Col>
            <Col className='collapsed-button' span={4}>
              <Button
                ghost
                size='small'
                icon={<MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </Col>
          </Row>
        )}
      </div>
    </Sider>
  )
}

export default Sider
