export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — visible on large screens only */}
      <div className="hidden w-1/2 lg:flex flex-col justify-center p-12 bg-bg-surface" style={ { borderRight: '1px solid rgba(255,255,255,.08)' } }>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center space-x-2">
            <span className="h-6 w-6 rounded bg-accent-primary" />
            <span className="text-sm font-semibold text-text-copy-primary">Ghost AI</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-text-copy-primary leading-tight">
            Design systems at the
            <br /> speed of thought.
          </h1>
          <p className="mt-4 text-lg text-text-copy-secondary max-w-prose">
            Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3 text-sm text-text-copy-secondary">
              <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-accent-primary" />
              AI Architecture Generation
            </li>
            <li className="flex items-start gap-3 text-sm text-text-copy-secondary">
              <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-accent-primary" />
              Real-time Collaboration
            </li>
            <li className="flex items-start gap-3 text-sm text-text-copy-secondary">
              <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-accent-primary" />
              Instant Spec Generation
            </li>
          </ul>
        </div>
      </div>

      {/* Right panel — form always visible */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
