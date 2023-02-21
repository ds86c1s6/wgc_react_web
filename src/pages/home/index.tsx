import React, { ReactElement } from 'react'
import { Button, List } from 'antd'
import { useNavigate, To } from 'react-router-dom'
import routes, { RouteItem } from '@/routes/routes'
import { isDemoRoute } from '@/utils/utils'

interface ListItemProps {
  component: ReactElement;
  path?: To;
}

const Home =  (props) => {
  const { dispatch } = props;
  const navigate = useNavigate();

  const demoList: ListItemProps[] = routes.filter((i: RouteItem) => !!i.demoRoot).map((item) => ({
    'component': <Button onClick={() => navigate(item.path)}>{item.description}</Button>,
  }))

  return (
    <List 
      itemLayout="vertical"
      dataSource={demoList}
      renderItem={(item: ListItemProps) => <List.Item>{item.component}</List.Item>}
    >
    </List>
  )
}

export default Home;