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