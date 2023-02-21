import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'

// portal，将自定义元素挂载到指定元素上
export const BodyPortal = (props) => {
  const wrapperBox = useRef(document.createElement('div'));

  useEffect(() => {
    const portal = wrapperBox.current;
    portal.style.position = 'relative';
    portal.style.zIndex = props?.zIndex || 'auto';
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    }
  }, []);

  return ReactDOM.createPortal(props.children, wrapperBox.current);
}


export const widthBodyPortal = (component) => {
  return React.forwardRef((props, ref) => (
    <BodyPortal>{React.createElement(component, { ...props, ref })}</BodyPortal>
  ))
}