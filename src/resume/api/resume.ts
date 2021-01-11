import request from '../utils/request'

export interface Info {
  name?: string
  job?: string
  gender?: string
  age?: number
  school?: string
  major?: string
  education?: string
  graduationYear?: number
  github?: string
  email?: string
  phone?: string
}

// 获取个人信息
export const getInfo = (params: any) => request({
  url: '/getInfo',
  method: 'get',
  params,
})

// 获取技能列表
export const getSkillList = (params: any) => request({
  url: '/getSkillList',
  method: 'get',
  params,
})

export interface Project {
  info?: string
  name?: string
  link?: string
  tags?: string[]
  detail?: string
}

// 获取项目列表
export const getProjectList = (params: any) => request({
  url: '/getProjectList',
  method: 'get',
  params,
})

// 获取个人总结列表
export const getSummaryList = (params: any) => request({
  url: '/getSummaryList',
  method: 'get',
  params,
})

