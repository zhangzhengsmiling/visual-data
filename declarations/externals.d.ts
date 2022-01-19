declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.sass' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.scss' {
  const resource: { [key: string]: string };
  export = resource;
}

// 图片文件声明
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
