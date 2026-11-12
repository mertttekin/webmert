import project from '@/data/project.json'

export interface Project {
    id: number
    url: string
    showImages?: boolean
    offline?: boolean
    imgMain?: string
    imgMobil?: string
    projectName: string
    companyName: string
    myRole: string
    description: string[]
}

export const PROJECTS = project.projects as Project[]

export const projectImage = (p: Project) => (p.showImages && !p.offline && p.imgMain ? `/img-projects/${p.imgMain}` : '')

export const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
