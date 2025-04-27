# Code Citations

## License: unknown
https://github.com/daniel548604106/toi-moi-client/tree/cf28ad40d9394944172940175df617503ebc4079/components/ErrorBoundary.tsx

```
ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error
```


## License: unknown
https://github.com/mtranggit/wx-movies-app/tree/4f05e52ed5b3b423fd7e6a7260eb863edd8eab7e/libs/ui/app-shell/src/lib/error-boundary.tsx

```
props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("
```


## License: MIT
https://github.com/ShivamAgarwal-code/EV-Arbitrage/tree/59100a9d34b1bd3f2d5990d37c1b7a6f58ecf3e9/src/components/ErrorBoundary/index.tsx

```
State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true
```

