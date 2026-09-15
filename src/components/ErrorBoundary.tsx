import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackLabel?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    // Log local, sin telemetría externa.
    console.error('[Belentani] UI crash capturado:', err);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-black px-6 text-center"
          role="alert"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/70">
            {this.props.fallbackLabel ?? 'Algo falló al renderizar'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="rounded-xl border border-purple-500/30 bg-purple-950/40 px-4 py-2 font-mono text-xs text-purple-200 hover:border-purple-400/60 hover:text-white"
            >
              Reintentar
            </button>
            <button
              onClick={this.handleReload}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 hover:text-white"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
