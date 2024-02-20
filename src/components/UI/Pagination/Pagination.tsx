import React from 'react'
import { ConfigProvider, Pagination as P } from 'antd'

import { IPagination } from './types'

const Pagination: React.FC<IPagination> = ({ total, pageSize = 5, onChange, current }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            colorPrimary: '#ffffff',
          },
        },
      }}
    >
      <P
        total={total}
        hideOnSinglePage={true}
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={onChange}
        current={current}
      />
    </ConfigProvider>
  )
}

export default Pagination
