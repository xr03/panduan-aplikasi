import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'
import Shot from './Shot.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('Shot', Shot)

    if (typeof window === 'undefined') return

    const scrollKeHash = () => {
        if (!location.hash) return
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
        el?.scrollIntoView()
    }

    // Tunggu semua gambar di halaman selesai dimuat, lalu scroll ulang
    const tungguGambar = () => {
        const imgs = [...document.querySelectorAll('.vp-doc img')]
        const belum = imgs.filter(img => !img.complete)
        if (!belum.length) return scrollKeHash()
        Promise.all(
        belum.map(img => new Promise(res => {
            img.addEventListener('load', res, { once: true })
            img.addEventListener('error', res, { once: true })
        }))
        ).then(scrollKeHash)
    }

    // Saat halaman dibuka langsung / reload
    window.addEventListener('load', tungguGambar)

    // Saat berpindah halaman lewat klik link di dalam situs
    router.onAfterRouteChanged = () => {
        setTimeout(tungguGambar, 100)
    }
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.vp-doc img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => initZoom())
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}