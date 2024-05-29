import  UserList, {UserListSkeleton}  from "@/app/ui/userList";
import AddUser from "@/app/ui/addUser";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2>hello User</h2>
     <AddUser />
     <Suspense fallback={<UserListSkeleton />}>
      <UserList />
     </Suspense>
    </main>
  );
}
