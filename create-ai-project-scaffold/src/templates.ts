export interface Template {
  name: string
  label: string
  description: string
  path: string
}

export const templates: Template[] = [
  {
    name: 'vite-react',
    label: 'React + Vite',
    description: 'React TypeScript プロジェクト with Vite',
    path: 'template-vite-react-typescript',
  },
  {
    name: 'astro-react',
    label: 'Astro + React',
    description: 'Astro + React TypeScript プロジェクト (SSG)',
    path: 'template-astro-react-typescript',
  },
  {
    name: 'tauri-react',
    label: 'Tauri + React',
    description: 'Tauri + React TypeScript プロジェクト (デスクトップ/モバイル)',
    path: 'template-tauri-react-vite',
  },
]

export const getTemplate = (name: string) => {
  return templates.find((template) => template.name === name)
}
