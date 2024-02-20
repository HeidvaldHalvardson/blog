import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const Spinner: React.FC = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
}

export default Spinner
