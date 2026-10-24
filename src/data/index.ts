import aiEngineer from './roadmaps/ai-engineer'
import android from './roadmaps/android'
import dataEngineer from './roadmaps/data-engineer'
import docker from './roadmaps/docker'
import golang from './roadmaps/golang'
import ios from './roadmaps/ios'
import java from './roadmaps/java'
import kubernetes from './roadmaps/kubernetes'
import machineLearning from './roadmaps/machine-learning'
import nodejs from './roadmaps/nodejs'
import productManager from './roadmaps/product-manager'
import qaEngineer from './roadmaps/qa-engineer'
import typescript from './roadmaps/typescript'
import uxDesign from './roadmaps/ux-design'
import backend from './roadmaps/backend'
import cyberSecurity from './roadmaps/cyber-security'
import dataAnalyst from './roadmaps/data-analyst'
import devops from './roadmaps/devops'
import frontend from './roadmaps/frontend'
import fullstack from './roadmaps/fullstack'
import python from './roadmaps/python'
import react from './roadmaps/react'
import sql from './roadmaps/sql'
import systemDesign from './roadmaps/system-design'
import type { Roadmap, Topic } from './types'

export const roadmaps: Roadmap[] = [
  // role-based
  frontend, backend, fullstack, devops, aiEngineer, machineLearning, dataAnalyst, dataEngineer,
  cyberSecurity, android, ios, qaEngineer, uxDesign, productManager,
  // skill-based
  react, typescript, nodejs, python, golang, java, sql, docker, kubernetes, systemDesign,
]

export const roadmapById = Object.fromEntries(roadmaps.map((r) => [r.id, r])) as Record<string, Roadmap>

export const allTopics = (r: Roadmap): Topic[] => r.sections.flatMap((s) => s.topics)

export const topicKey = (roadmapId: string, topicId: string) => `${roadmapId}/${topicId}`

export function findTopic(key: string) {
  const [roadmapId, topicId] = key.split('/')
  const roadmap = roadmapById[roadmapId]
  if (!roadmap) return undefined
  for (const section of roadmap.sections) {
    const topic = section.topics.find((t) => t.id === topicId)
    if (topic) return { roadmap, section, topic }
  }
  return undefined
}
