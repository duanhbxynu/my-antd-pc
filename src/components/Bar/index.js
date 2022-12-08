import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

function echartInit(node, xData, sData, title) {
  const myChart = echarts.init(node)
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '数据',
        type: 'bar',
        data: sData
      }
    ]
  })
}

export default function Bar({ style, xData, sData, title }) {
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title)
  }, [xData, sData])
  return (
    <div ref={nodeRef} style={style}></div>
  )
}
