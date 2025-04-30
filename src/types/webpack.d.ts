declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

interface WebpackContext {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

interface WebpackRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): WebpackContext;
}

declare let require: WebpackRequire;
