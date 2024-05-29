/**
 * @Author: huweijian
 * @Date: 2024-05-28 15:14:17
 * @Desc: 错误包装
 */
'use client'
import React from 'react'
type Props = {
  fallback: React.ReactNode
  children: React.ReactNode
}
type State = {
  hasError: boolean
}
export default class ErrorBoundary extends React.Component<Props, State>{
  state: State
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: { componentStack: any; }) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // console.log('componentDidCatch', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}