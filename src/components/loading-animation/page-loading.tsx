import React, {} from 'react';
import styles from './index.module.less';


export function CircleLoading() {

  return (
    <div className={styles.circleLoading}>
      {Array(8).fill(0).map(() => <span />)}
    </div>
  )
}

export function DotLoading() {

  return (
    <div className={styles.dotLoading}>
      {Array(5).fill(0).map(() => <span />)}
    </div>
  )
}

export function WaveLoading() {

  return (
    <div className={styles.waveLoading}>
      {Array(5).fill(0).map(() => <span />)}
    </div>
  )
}