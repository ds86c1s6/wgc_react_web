import React, { useState } from 'react'
import { useNavigate, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { BodyPortal } from '@/components/portal'
import { TransitionSwitch } from '@/components/portal/transitionSwitch'
import styles from './index.module.less'
import messageFactory from '@/utils/message-blink'

const Demo1 =  () => {
  const navigate = useNavigate();
  const [showNormalPortal, setShowNormalPortal] = useState(false)
  const { isBlink, startBilnk, stopBlink } = messageFactory();
  const [count, setCount] = useState(0)

  return (
    <div className="commonPage">
      <Button onClick={() => setShowNormalPortal(true)}>非路由情况下的普通portal使用</Button>
      <Divider />
      <Button onClick={() => navigate('/demo1/demo2')}>动画路由切换</Button>
      <Divider />
      <Button onClick={() => {
        // !isBlink ? startBilnk('五条新消息') : stopBlink()
        startBilnk(`${count}条新消息`)
        setCount(count+1);
      }} onDoubleClick={() => stopBlink()}>{isBlink ? '停止闪烁' : '消息闪烁'}</Button>


      {// 直接挂载到body下
        showNormalPortal && (
          <BodyPortal>
            <div className={styles.pageContainer} onClick={() => setShowNormalPortal(false)}>123456</div>
          </BodyPortal>
        )
      }

      <BodyPortal>
        <TransitionSwitch>
          <Outlet />
        </TransitionSwitch>
      </BodyPortal>
    </div>
  )
}

export default Demo1