declare module '*.module.css' {
  export default Record<string, string>
}
declare module '*.module.scss' {
  export default Record<string, string>
}
declare module '*.module.sass' {
  export default Record<string, string>
}
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}
declare module '*.png' {
  export default string
}
declare module '*.jpg' {
  export default string
}
declare module '*.jpeg' {
  export default string
}
declare module '*.webp' {
  export default string
}
declare module '*?url' {
  export default string
}
