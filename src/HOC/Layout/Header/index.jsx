import { Col, Row, Avatar, Menu, Button, Popover, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import bpLogo from '../../../Resources/images/bp-logo.png'

const content = (
  <Menu
    items={[
      {
        label: (
          <div
            onClick={() => {
              message.success('Click on My Account')
            }}>
            My Account
          </div>
        )
      },
      {
        label: (
          <div
            onClick={() => {
              message.success('You Have Logged Out')
            }}>
            Log out
          </div>
        )
      }
    ]}
    selectable={false}
  />
)

const Header = () => {
  return (
    <Row className='header'>
      <Col className='company-avatar' span={6}>
        <Avatar className='company-logo' size={40} src={bpLogo} />
        <span> BP New Zealand</span>
      </Col>
      <Col className='user-info' span={6} offset={12}>
        <div>
          <Avatar src='https://joeschmoe.io/api/v1/random' />
          <Popover color='#15202a' content={content} trigger='hover'>
            <Button
              ghost
              className='user-name'
              style={{ borderColor: 'transparent' }}>
              Glen Ruby <DownOutlined />
            </Button>
          </Popover>
        </div>
      </Col>
    </Row>
  )
}

export default Header
