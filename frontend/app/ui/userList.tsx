/**
 * @Author: huweijian
 * @Date: 2024-05-23 21:00:08
 * @Desc: 用户列表
 */
import clsx from 'clsx';
import { Key } from 'react';
import { getUserList } from "@/app/model/user";

export interface ColumnType {
  name: string;
  index: string;
  render?: (val: any, record: any) => React.ReactNode;
}
interface UserType {
    id: number;
    name: string;
    createAt: Date;
    updateAt: Date;
    [key:string]: any
}
export default async function UserList() {
  const users: UserType[] = (await getUserList()) as UserType[]
  const columns:ColumnType[] = [
    {index: 'id', name: '序号'},
    {index: 'name', name: '姓名'},
    {index: 'createAt', name: '创建时间', render: (val) => new Date(val).toDateString() },
    {index: 'createAt', name: '修改时间', render: (val) => new Date(val).toDateString()}, ]
  function TdRender(column: ColumnType, item: UserType) {
    const val = item[column.index as string];
    if (column.render) {
      return column.render(val, item);
    }
    return val;
  }
  return <div className='bg-white w-2/3 mt-4'>
    <table className="md:table hidden min-w-full text-gray-900">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
        {columns.map((column, index) => (
                <th
                  key={column.index as Key}
                  className={clsx('px-4 py-5 font-medium', {
                    'sm:pl-6': index === 0,
                  })}
                >
                  {column.name}
                </th>
              ))}
        </tr>
        </thead>
        <tbody className='bg-white'>
        {users?.map((item, index) => (
              <tr
                key={item.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                {
                  columns.map((column) => (
                    <td
                      key={`${item.id}-${column.index}`}
                      className="whitespace-nowrap px-3 py-3"
                    >
                      {TdRender(column, item)}
                    </td>
                  ))
                }
              </tr>
            ))}
        </tbody>
    </table>
  </div>
}