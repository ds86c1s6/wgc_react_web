import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { BodyPortal } from '@/components/portal'
import { TransitionSwitch } from '@/components/portal/transitionSwitch'
import styles from './index.module.less'

const Demo1 =  () => {
  const navigate = useNavigate();
  const [showNormalPortal, setShowNormalPortal] = useState(false)

  return (
    <div className="commonPage">
      <Button onClick={() => setShowNormalPortal(true)}>非路由情况下的普通portal使用</Button>
      <Divider />
      <Button onClick={() => navigate('/demo1/demo2')}>动画路由切换</Button>


      {// 直接挂载到body下
        showNormalPortal && (
          <BodyPortal>
            <div className={styles.pageContainer} onClick={() => setShowNormalPortal(false)}>123456</div>
          </BodyPortal>
        )
      }

      <BodyPortal>
        <TransitionSwitch/>
      </BodyPortal>
    </div>
  )
}

export default Demo1