import fetch from './fetch'

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

export interface Project {
  info?: string
  name?: string
  link?: string
  tags?: string[]
  detail?: string
}

// export interface API {
//   '/getInfo': Info
//   '/getSkillList': string[]
//   '/getProjectList': Project[]
//   '/getSummaryList': string[]
// }

// 获取个人信息
export const getInfo = (params: any) => fetch<Info>({
  url: '/getInfo',
  method: 'get',
  params,
})

// 获取技能列表
export const getSkillList = (params: any) => fetch<string[]>({
  url: '/getSkillList',
  method: 'get',
  params,
})

// 获取项目列表
export const getProjectList = (params: any) => fetch<Project[]>({
  url: '/getProjectList',
  method: 'get',
  params,
})

// 获取个人总结列表
export const getSummaryList = (params: any) => fetch<string[]>({
  url: '/getSummaryList',
  method: 'get',
  params,
})

