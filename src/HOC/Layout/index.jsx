import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'

const { Content } = Layout

const PageLayout = (props) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider />
      <Layout
        style={{
          height: '100vh',
          padding: '0 2vw',
          backgroundColor: '#15202a'
        }}>
        <Header />
        <Content style={{ overflowY: 'auto' }}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
