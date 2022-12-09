import { http } from '@/utils'

// 获取频道分类接口
export function getArticle() {
  return http.get('/channels')
}

// 获取文章列表接口
export function getArticleList(params) {
  return http.get('/mp/articles', { params })
}

// 删除文章接口
export function delArticle(id) {
  return http.delete('/mp/articles/' + id)
}

// 发布文章接口
export function publishArticle(params) {
  return http.post('/mp/articles?draft=false', params)
}

// 编辑后发布文章接口
export function editPublishArticle(id, params) {
  return http.put(`/mp/articles/${id}?draft=false`, params)
}

// 使用id获取文章详情数据接口
export function getArticleDetail(id) {
  return http.get('/mp/articles/' + id)
}