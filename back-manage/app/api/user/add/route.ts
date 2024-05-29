/**
 * @Author: huweijian
 * @Date: 2024-05-23 15:57:07
 * @Desc: 创建用户
 */
import { createUser } from "@/app/model/user"
export async function POST (req: Request){
  const formData = await req.formData()
  const name = formData.getAll('name')[0] as string
  const res = await createUser(name)
  return Response.json({id: res.id,name })
}