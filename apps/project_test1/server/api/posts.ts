import path from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content')
export default defineEventHandler((_event) => {
  const fileNames = fs.readdirSync(postsDir)
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, '')
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const matterInfo = matter(fileContents)
    const fileInfo = fs.statSync(fullPath)
    return {
      id,
      title: matterInfo.data.title as string,
      date: fileInfo.ctime,
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
})
