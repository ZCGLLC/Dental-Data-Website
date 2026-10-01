"use client";

import { Component, useEffect, useRef, useState } from "react";

class Guard extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

export function CanvasSlot({
  children,
  fallback,
  className,
  eager = false,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin: "320px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className={className}>
      {visible ? <Guard fallback={fallback}>{children}</Guard> : fallback}
    </div>
  );
}
