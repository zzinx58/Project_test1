import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content')
export default defineEventHandler(async (event) => {
  const fileName = `${getRouterParam(event, 'id')}.md`
  const fullPath = path.join(postsDir, fileName)
  const fileContent = fs.readFileSync(fullPath, 'utf-8')
  const matterInfo = matter(fileContent)
  const processedContent = await remark().use(html).process(matterInfo.content)
  const content = processedContent.toString()
  return {
    title: matterInfo.data.title as string,
    content,
  }
})
