'use client';

export function EcguysLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center font-mono text-lg font-bold ${className}`}>
      <span className="text-muted-foreground">[</span>
      <span className="text-muted-foreground">&lt;</span>
      <span className="text-accent">/</span>
      <span className="text-gradient">ECGUYS</span>
      <span className="text-muted-foreground">&gt;</span>
      <span className="text-muted-foreground">]</span>
    </div>
  );
}

export function EcguysLogoSmall({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center font-mono text-sm font-bold ${className}`}>
      <span className="text-muted-foreground text-xs">[</span>
      <span className="text-muted-foreground text-xs">&lt;</span>
      <span className="text-accent text-xs">/</span>
      <span className="text-gradient text-sm">ECGUYS</span>
      <span className="text-muted-foreground text-xs">&gt;</span>
      <span className="text-muted-foreground text-xs">]</span>
    </div>
  );
}
