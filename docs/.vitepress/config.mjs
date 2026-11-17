import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/panduan-aplikasi/',
  lang: 'id-ID',
  title: 'Panduan Aplikasi Mitra MLB',
  description: 'Panduan langkah demi langkah menggunakan aplikasi Mitra MLB',
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    image: { lazyLoading: true }
  },

  themeConfig: {
    nav: [
      { text: 'Beranda', link: '/' }
    ],

    sidebar: [
      {
        text: 'Akun',
        items: [
          { text: 'Login dan verifikasi email', link: '/akun/login-dan-verifikasi-email' },
          { text: 'Login multi perangkat', link: '/akun/login-multi-perangkat' }
        ]
      },
      {
        text: 'Stok',
        items: [
          { text: 'Top up stok', link: '/stok/topup-stok' }
        ]
      },
      {
        text: 'Transaksi',
        items: [
          { text: 'Melakukan transaksi', link: '/transaksi/melakukan-transaksi' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Cari', buttonAriaLabel: 'Cari' },
          modal: {
            noResultsText: 'Tidak ada hasil untuk',
            resetButtonTitle: 'Hapus pencarian',
            footer: {
              selectText: 'Pilih',
              navigateText: 'Navigasi',
              closeText: 'Tutup'
            }
          }
        }
      }
    },

    outline: { label: 'Di halaman ini' },
    docFooter: { prev: 'Sebelumnya', next: 'Selanjutnya' },
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Kembali ke atas',
    darkModeSwitchLabel: 'Tampilan',
    lastUpdated: { text: 'Terakhir diperbarui' }
  }
})