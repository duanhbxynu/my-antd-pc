import React from 'react'
import Bar from '@/components/Bar'
import './index'

export default function Home() {
  return (
    <div className='home'>
      <Bar style={{ width: '500px', height: '400px' }}
        xData={['vue', 'react', 'angular']}
        sData={[50, 60, 70]}
        title='三大框架满意度' />
      <Bar style={{ width: '500px', height: '400px' }}
        xData={['vue', 'react', 'angular']}
        sData={[50, 60, 70]}
        title='三大框架使用度' />
    </div>
  )
}
