/**
 * @Author: huweijian
 * @Date: 2024-05-23 15:26:08
 * @Desc: user接口
 */
import { searchUsers } from "@/app/model/user"
export async function GET(){
  const list = await searchUsers()
  return Response.json({list})
}

