import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center lg:py-24">
            {/* Icon Wrapper */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>

            {/* Error Badge / Code */}
            <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                404 Error
            </span>

            {/* Title */}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Page not found
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or never existed.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Button
                    nativeButton={false}
                    className="w-full sm:w-auto"
                    render={
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    }
                />

                <Button
                    nativeButton={false}
                    variant="outline"
                    className="w-full sm:w-auto"
                    render={
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Link>
                    }
                />
            </div>
        </div>
    );
}