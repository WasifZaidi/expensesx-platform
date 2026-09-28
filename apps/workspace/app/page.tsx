import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CirclePlus,
  Search,
  Wallet,
} from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AmountCard } from "@/components/amount-card";
import SpendingsTable from "@/components/spendings-table";


export default function Home() {
  return (
    <div className="container ">
      <AmountCard />
      <div className="mt-8">
        <SpendingsTable />
      </div>
    </div>
  );
}