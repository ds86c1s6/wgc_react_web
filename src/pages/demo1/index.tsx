import React, { useState } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import { Button, Divider } from 'antd'
import { BodyPortal } from '@/components/portal'
import { TransitionSwitch } from '@/components/portal/transitionSwitch'
import styles from './index.module.less'
import messageFactory from '@/utils/message-blink'

const Demo1 =  () => {
  const navigate = useNavigate();
  const [showNormalPortal, setShowNormalPortal] = useState(false)
  const { isBlink, startBilnk, stopBlink } = messageFactory();
  const [count, setCount] = useState(1)
  const outlet = useOutlet();

  return (
    <div className="commonPage">
      <Button onClick={() => setShowNormalPortal(true)}>非路由情况下的普通portal使用</Button>
      <Divider />
      <Button onClick={() => navigate('/demo1/demo12')}>portal动画路由跳转demo2</Button>
      <Divider />
      <Button onClick={() => navigate('/demo1/demo13')}>portal动画路由跳转demo3</Button>
      <Divider />
      <Button onClick={() => {
        // !isBlink ? startBilnk('五条新消息') : stopBlink()
        startBilnk(`${count}条新消息`)
        setCount(count+1);
      }}>{'消息闪烁' + count}</Button>
      <Button onClick={() => {
        setCount(0);
        stopBlink();
      }}>{'停止闪烁'}</Button>


      {// 直接挂载到body下
        showNormalPortal && (
          <BodyPortal>
            <div className={styles.pageContainer} onClick={() => setShowNormalPortal(false)}>123456</div>
          </BodyPortal>
        )
      }

      <BodyPortal>
        <TransitionSwitch>
          <>
          {outlet}
          </>
        </TransitionSwitch>
      </BodyPortal>
    </div>
  )
}

export default Demo1