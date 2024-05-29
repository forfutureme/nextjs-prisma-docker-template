import  UserList  from "@/app/ui/userList";
import AddUser from "@/app/ui/addUser";
import ErrorBoundary from "./ui/errorBoundary";
import Error from "./error";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2>hello User</h2>
     <AddUser />


     <ErrorBoundary fallback={<Error />}>
      <UserList />
     </ErrorBoundary>
    
    </main>
  );
}
