/**
 * @Author: huweijian
 * @Date: 2024-05-23 16:39:59
 * @Desc: 查询用户信息接口
 */
import { searchUserInfo } from "@/app/model/user"
export async function GET(req: Request & {nextUrl: {searchParams: URLSearchParams}}, {params}: {params?: {id: string}}){
  const id = params?.id || ''
  const list = await searchUserInfo(+id)
  return Response.json({list})
}
