import { Loading as VantLoading } from 'react-vant'

const Loading = () => {
  return (
    <div className="fixed-loading">
      <VantLoading size="24px" vertical>加载中...</VantLoading>
    </div>
  )
}

export default Loading