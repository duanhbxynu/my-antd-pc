import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getArticle, publishArticle, getArticleDetail } from '@/api'
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'

const { Option } = Select

const Publish = () => {
  // 频道列表数据获取
  const [channels, setChannels] = useState([])
  useEffect(() => {
    async function fetchChannel() {
      const res = await getArticle()
      setChannels(res.data.channels)
    }
    fetchChannel()
  }, [])

  // 上传图片
  // 声明一个暂存仓库
  const fileListRef = useRef([])
  const [fileList, setFileList] = useState([])
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    // 暂存图片列表导ref中
    fileListRef.current = fileList
  }

  // 切换图片type
  const [imgCount, setImgCount] = useState(1)
  const changeType = e => {
    const count = e.target.value
    setImgCount(count)

    if (count === 1) {
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }

  // 发布按钮
  const articleId = params.get('id')
  const onFinish = async (values) => {
    // 数据的二次处理，重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id, content, title, type, cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (articleId) {
      // 编辑
      await editPublishArticle(articleId, params)
    } else {
      // 保存
      await publishArticle(params)
    }
  }

  // 编辑文章-数据获取-数据回显
  const [params] = useSearchParams()
  const [form] = Form.useForm()
  useEffect(() => {
    async function getDetail() {
      // const res = await getArticleDetail()
      // const { cover, ...formValue } = res.data
      const data = {
        channel_id: 1,
        content: "<p>测试</p>",
        cover: {
          type: 1,
          images: ["http://geek.itheima.net/uploads/1670580365579.png"]
        },
        type: 1,
        title: "测试文章"
      }
      const { cover } = data
      form.setFieldsValue({ ...data, type: cover.type })
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setImgCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      getDetail()
    }
  }, [articleId])

  return (
    <div className="publish">
      <Card title={
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{articleId ? '修改文章' : '发布文章'}</Breadcrumb.Item>
        </Breadcrumb>
      }>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 1, content: '' }} form={form} onFinish={onFinish}>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]} >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]} >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {
              imgCount > 0 && (
                <Upload name="image" listType="picture-card" className="avatar-uploader" showUploadList
                  action="http://geek.itheima.net/v1_0/upload" fileList={fileList} onChange={onUploadChange}
                  maxCount={imgCount} multiple={imgCount > 1}>
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              )
            }

          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]} >
            <ReactQuill className='publish-quill' theme='snow' placeholder='请输入文章内容' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">{articleId ? '修改文章' : '发布文章'}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
