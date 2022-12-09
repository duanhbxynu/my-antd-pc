import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { history } from '@/utils/history'
import { Breadcrumb, Card, Form, Button, Radio, Select, DatePicker, Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/logo.png'

import { getArticle, getArticleList, delArticle } from '@/api'

const { Option } = Select
const { RangePicker } = DatePicker


export default function Article() {
  const [value, setValue] = useState('')

  // 频道下拉数据
  const [channels, setChannels] = useState([])
  useEffect(() => {
    async function fetchChannels() {
      const res = await getArticle()
      setChannels(res.data.channels)
    }
    fetchChannels()
  }, [])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images || img404} width={80} height={80} alt='' />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type='primary' shape='circle' icon={<EditOutlined />}
              onClick={() => history.push(`/articleDetails?id=${data.id}`)}
            ></Button>
            <Popconfirm title="确认删除该条文章吗？" onConfirm={() => delArticles(data.id)} onText="确认" cancelText="取消">
              <Button type='primary' danger shape='circle' icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: ['http://geek.itheima.net/resources/images/15.jpg'],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]

  // 渲染表格数据
  const [article, setArticleList] = useState({
    list: [],
    count: 0
  })
  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    pre_page: 10
  })
  // 发送接口请求
  useEffect(() => {
    async function fetchArticleList() {
      const res = await getArticleList()
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    fetchArticleList()
  }, [params])

  // 筛选功能
  const onSearch = values => {
    const { status, channel_id, date } = values
    // 格式化表单数据
    const _params = {}
    // 格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.END_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改屁啊让面试参数，触发接口再次发起请求
    setParams({
      ...params,
      ..._params
    })
  }

  // 切换页码
  const pageChange = (page) => {
    // 拿到当前页参数，修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }

  // 删除文章
  const delArticles = async (id) => {
    await delArticle(id)
    setParams({
      page: 1,
      pre_page: 10
    })
  }

  return (
    <div>
      <Card title={
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to='/home'>首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>
      } style={{ marginBottom: 20 }}>
        <Form initialValues={{ status: '' }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={value || ''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 240 }} allowClear>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: 80 }}>筛选</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果`}>
        {/* <Table rowKey="id" columns={columns} dataSource={article.list} /> */}
        <Table rowKey="id" columns={columns} dataSource={data}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.pre_page,
            onChange: pageChange
          }} />
      </Card>
    </div >
  )
}
