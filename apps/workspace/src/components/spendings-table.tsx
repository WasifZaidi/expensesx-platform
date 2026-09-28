import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from 'cn';

export default function SpendingsTable({ isCardStyle }: { isCardStyle?: boolean }) {
  return (
    <div
      className={cn(
        isCardStyle && "rounded-xl border bg-card text-card-foreground"
      )}
    >
      <div className={cn("border-b py-4", isCardStyle && "px-6")}>
        <h2 className="text-base font-semibold">Recent Spending</h2>
        <p className="text-sm text-muted-foreground">
          Your latest spending activity
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Spend</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[
            {
              spend: "Cloud Hosting",
              amount: "$24.00",
              time: "2 hours ago",
            },
            {
              spend: "Domain Renewal",
              amount: "$12.00",
              time: "Yesterday",
            },
            {
              spend: "API Credits",
              amount: "$35.00",
              time: "2 days ago",
            },
            {
              spend: "Software License",
              amount: "$49.00",
              time: "4 days ago",
            },
          ].map((item) => (
            <TableRow key={`${item.spend}-${item.time}`}>
              <TableCell className="font-medium">
                {item.spend}
              </TableCell>

              <TableCell className="text-right font-medium">
                {item.amount}
              </TableCell>

              <TableCell className="text-right text-muted-foreground">
                {item.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}
