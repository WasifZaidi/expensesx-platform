export function AmountCard() {
    return (
        <div
            className="
    relative
    w-full
    max-w-md
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-gradient-to-br
    from-blue-100
    via-white
    to-purple-100
    p-6
    text-card-foreground
    shadow-xl
    transition-colors

    dark:border-white/10
    dark:bg-[linear-gradient(135deg,oklch(0.235_0.035_280),oklch(0.19_0.025_285),oklch(0.16_0.015_270))]
  "
        >
            {/* Background ambient lighting */}
            <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      -right-16
      -top-16
      h-48
      w-48
      rounded-full
      bg-purple-300/20
      blur-3xl

      dark:bg-purple-500/15
    "
            />

            <div
                aria-hidden="true"
                className="
      pointer-events-none
      absolute
      -bottom-16
      -left-16
      h-48
      w-48
      rounded-full
      bg-indigo-300/20
      blur-3xl

      dark:bg-indigo-500/10
    "
            />

            {/* Header */}
            <div className="relative z-10 mb-8 flex items-start justify-between">
                <div>
                    <p
                        className="
          text-xs
          font-medium
          uppercase
          tracking-widest
          text-muted-foreground

          dark:text-purple-200/70
        "
                    >
                        Current Balance
                    </p>

                    <h2 className="mt-1 text-3xl font-bold tracking-tight">
                        $24,580.50
                    </h2>
                </div>

                {/* EMV Chip */}
                <div
                    className="
        relative
        flex
        h-10
        w-12
        items-center
        justify-center
        overflow-hidden
        rounded-lg
        border
        border-amber-300/40
        bg-gradient-to-tr
        from-amber-200
        via-amber-400
        to-amber-100
        shadow-inner
      "
                >
                    <div className="absolute top-3 h-px w-full bg-amber-600/40" />
                    <div className="absolute bottom-3 h-px w-full bg-amber-600/40" />
                    <div className="absolute left-3 h-full w-px bg-amber-600/40" />
                    <div className="absolute right-3 h-full w-px bg-amber-600/40" />
                </div>
            </div>

            {/* Card Number */}
            <div className="relative z-10 mb-6">
                <p
                    className="
        font-mono
        text-sm
        tracking-widest
        text-muted-foreground

        dark:text-slate-300
      "
                >
                    •••• •••• •••• 4892
                </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-end justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="User Avatar"
                            className="
            h-11
            w-11
            rounded-full
            border-2
            border-border
            object-cover
            shadow-md

            dark:border-white/20
          "
                        />

                        <div
                            className="
            absolute
            bottom-0
            right-0
            h-3
            w-3
            rounded-full
            border-2
            border-card
            bg-emerald-500

            dark:border-[oklch(0.19_0.025_285)]
          "
                        />
                    </div>

                    <div>
                        <p
                            className="
            text-xs
            font-medium
            text-muted-foreground

            dark:text-slate-400
          "
                        >
                            Cardholder
                        </p>

                        <p className="text-sm font-semibold tracking-wide">
                            Samantha Reed
                        </p>
                    </div>
                </div>

                {/* Card Brand */}
                <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full bg-red-500/80 backdrop-blur-sm" />
                    <div className="h-6 w-6 rounded-full bg-amber-500/80 backdrop-blur-sm" />
                </div>
            </div>
        </div>
    )
}