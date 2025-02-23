import { defineStore } from 'pinia'

interface LayoutState {
  showToc: boolean
  tocContent: string
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    showToc: false,
    tocContent: ''
  }),
  actions: {
    setShowToc(show: boolean): void {
      this.showToc = show
    },
    setTocContent(content: string): void {
      this.tocContent = content
    }
  }
})