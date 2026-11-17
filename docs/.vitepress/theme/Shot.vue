<script setup>
import { ref } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  marks: { type: Array, default: () => [] },
  frame: { type: Boolean, default: false },
  width: { type: Number, default: 320 },
  debug: { type: Boolean, default: false }
})

const hasil = ref('')

// Hitung posisi klik dalam persen, lalu salin ke clipboard
function ambil(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const x = Math.round(((e.clientX - r.left) / r.width) * 100)
  const y = Math.round(((e.clientY - r.top) / r.height) * 100)
  hasil.value = `{ x: ${x}, y: ${y}, size: 20, n: 1 }`
  navigator.clipboard?.writeText(hasil.value)
}

// Lingkaran (default) atau kotak (jika ada h)
function markStyle(m) {
  const w = m.w ?? m.size ?? 20
  const style = { left: m.x + '%', top: m.y + '%', width: w + '%' }
  if (m.h) {
    style.height = m.h + '%'
    style.borderRadius = '10px'
  } else {
    style.aspectRatio = '1'
  }
  return style
}
</script>

<template>
  <figure class="shot">
    <div
      class="frame"
      :class="{ phone: frame }"
      :style="{ maxWidth: width + 'px' }"
    >
      <div
        class="wrap"
        :style="{ cursor: debug ? 'crosshair' : 'default' }"
        @click="debug && ambil($event)"
      >
        <img class="shot-img" :src="src" :alt="alt" loading="lazy" />
        <span
          v-for="(m, i) in marks"
          :key="i"
          class="mark"
          :style="markStyle(m)"
        >
          <b v-if="m.n">{{ m.n }}</b>
        </span>
      </div>
    </div>
    <figcaption v-if="debug && hasil" class="debug-out">
      <code>{{ hasil }}</code> (sudah disalin)
    </figcaption>
  </figure>
</template>

<style scoped>
.shot {
  margin: 16px 0;
}

.frame {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* Frame ala HP */
.frame.phone {
  border: 8px solid #5e5e5e;
  border-radius: 28px;
}

.wrap {
  position: relative;
  line-height: 0;
}

.wrap img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  border-radius: 11px;
}

.frame.phone .wrap img {
  border-radius: 20px;
}

/* Tanda */
.mark {
  position: absolute;
  transform: translate(-50%, -50%);
  border: 3px solid var(--shot-mark, #e53935);
  border-radius: 50%;
  pointer-events: none;
}

.mark b {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--shot-mark, #e53935);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.debug-out {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.5;
}
</style>