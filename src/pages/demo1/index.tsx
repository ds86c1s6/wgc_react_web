import React from 'react'
import history from '@/core/history'
import { Button } from 'antd'

const Demo1 =  () => {

  return (
    <div>
      demo1
      <Button onClick={() => history.replace('/')}>返回</Button>
    </div>
  )
}

export default Demo1