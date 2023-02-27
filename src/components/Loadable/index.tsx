// react路由懒加载
import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LoadingComponent = (props) => {
  if(props.error) {
    // 1.页面更新拉了新的js文件
    // 2.接口请求错误，js没拿到
    return <div>模块已更新，请刷新页面</div>
  }else if(props.timeOut) {
    return <p>加载超时</p>
  }else if(props.pastDelay) {
    return (
      <div className='fc'>
        <Spin size='large' tip="加载中..."></Spin>
      </div>
    )
  }
}

export default (loader, loading = LoadingComponent) => {
  const LoaderFun = Loadable({ loader, loading });
  const originalWillMount = LoaderFun.prototype.componentWillMount;
  LoaderFun.prototype.UNSAFE_componentWillMount = originalWillMount
  delete LoaderFun.prototype.componentWillMount // 解决react-loadable的componentWillMount warning
  return LoaderFun;
}