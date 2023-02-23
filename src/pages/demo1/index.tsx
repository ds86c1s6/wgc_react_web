import React, { useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { BodyPortal } from '@/components/portal'
import { TransitionSwitch } from '@/components/portal/transitionSwitch'
import { portalRoutes } from '@/routes/routes'
import styles from './index.module.less'
import messageBlink from '@/utils/message-blink'

const Demo1 =  () => {
  const navigate = useNavigate();
  const [showNormalPortal, setShowNormalPortal] = useState(false)

  return (
    <div className="commonPage">
      <Button onClick={() => setShowNormalPortal(true)}>非路由情况下的普通portal使用</Button>
      <Divider />
      <Button onClick={() => navigate('/demo1/demo2')}>动画路由切换</Button>
      <Divider />
      <Button onClick={() => {
        if(!messageBlink.timer) {
          messageBlink.start('新消息2222')
        }else {
          messageBlink.stop()
        }
      }}>消息闪烁</Button>


      {// 直接挂载到body下
        showNormalPortal && (
          <BodyPortal>
            <div className={styles.pageContainer} onClick={() => setShowNormalPortal(false)}>123456</div>
          </BodyPortal>
        )
      }

      <BodyPortal>
        {/* <TransitionSwitch/> */}
        <Routes>
          {
            portalRoutes.map((route: any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )
            })
          }
        </Routes>
      </BodyPortal>
    </div>
  )
}

export default Demo1