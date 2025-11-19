import { GetAllParticipants } from "@/app/action.action";
import Navigation from "@/components/layout/Navigation";
import { redirect } from "next/navigation";
import ListParticipants from "./components/Lists";
import AdminTitle from "./components/AdminTitle";

export default async function Page({ params }: { params: { key: string } }) {
  const { key } = await params;

  if (!key) return redirect("/");
  if (key !== process.env.ADMIN_KEY) return redirect("/");

  const query = await GetAllParticipants();

  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <div className="max-w-7xl p-6 mx-auto w-full">
        <AdminTitle
          participantsCount={query.data?.partipantCount}
          paymentCount={query.data?.paymentCount}
          totalAmount={query.data?.totalAmount}
        />
        <ListParticipants orders={query.data?.data} />
      </div>
    </main>
  );
}
