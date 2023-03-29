import React from "react";
import ReactDOM from "react-dom";

const Container = ({ children }) => <>{children}</>

// render和createPortal的区别
// 1.render在首次调用时会将容器节点里的所有DOM元素都替换，而createPortal是向container下插入一个子节点
// 2.render会直接渲染成DOM元素，而createPortal则是渲染出React元素，最后还是需要通过render渲染成真实DOM
const renderModal = (Template, props) => {
  const dom = document.createElement('div');
  dom.setAttribute('class', 'Portal-instance-container');
  document.body.appendChild(dom);
  const template = (
    <Container>
      <Template {...props} /> 
    </Container>
  )
  ReactDOM.render(template, dom)
  return dom;
}

export const create = (Template: any, data = {}, options?: { unmountDelay?: number }) => {
  let instance = null;
  
  const unmountNode = () => {
    setTimeout(() => {
      if(instance) {
        document.body.removeChild(instance)
      }
    }, options?.unmountDelay || 0);
  }

  const p = new Promise((resolve, reject) => {
    const props = {
      onResolve: resolve,
      onReject: reject,
      ...data
    }
    instance = renderModal(Template, props)
  })

  const resolveCallBack = (val) => {
    unmountNode();
    return Promise.resolve(val)
  }

  const rejectCallBack = (err) => {
    unmountNode();
    return Promise.reject(err)
  }

  return p.then(resolveCallBack, rejectCallBack)
}