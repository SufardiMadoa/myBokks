<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto">
    <div>
      <label class="block font-medium">Judul</label>
      <input v-model="form.judul" type="text" class="w-full border p-2 rounded" />
      <p v-if="errors.judul" class="text-red-600 text-sm">{{ errors.judul }}</p>
    </div>

    <div>
      <label class="block font-medium">ID Jenis</label>
      <input v-model="form.id_Jenis" type="number" class="w-full border p-2 rounded" />
      <p v-if="errors.id_Jenis" class="text-red-600 text-sm">{{ errors.id_Jenis }}</p>
    </div>

    <div>
      <label class="block font-medium">Penulis</label>
      <input v-model="form.penulis" type="text" class="w-full border p-2 rounded" />
      <p v-if="errors.penulis" class="text-red-600 text-sm">{{ errors.penulis }}</p>
    </div>

    <div>
      <label class="block font-medium">Penerbit</label>
      <input v-model="form.penerbit" type="text" class="w-full border p-2 rounded" />
      <p v-if="errors.penerbit" class="text-red-600 text-sm">{{ errors.penerbit }}</p>
    </div>

    <div>
      <label class="block font-medium">Tanggal Terbit</label>
      <input v-model="form.tanggal_terbit" type="date" class="w-full border p-2 rounded" />
      <p v-if="errors.tanggal_terbit" class="text-red-600 text-sm">{{ errors.tanggal_terbit }}</p>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {{ loading ? 'Menyimpan...' : 'Simpan Buku' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import bukuService from '@/service/getBooks'

const form = reactive({
  judul: '',
  id_Jenis: '',
  penulis: '',
  penerbit: '',
  tanggal_terbit: ''
})

const errors = reactive({})
const loading = ref(false)

const handleSubmit = async () => {
  errors.judul = form.judul ? '' : 'Judul wajib diisi'
  errors.id_Jenis = form.id_Jenis ? '' : 'ID Jenis wajib diisi'
  errors.penulis = form.penulis ? '' : 'Penulis wajib diisi'
  errors.penerbit = form.penerbit ? '' : 'Penerbit wajib diisi'
  errors.tanggal_terbit = form.tanggal_terbit ? '' : 'Tanggal terbit wajib diisi'

  const hasError = Object.values(errors).some(error => error)
  if (hasError) return

  loading.value = true
  try {
    const payload = {
      ...form,
      id_Jenis: parseInt(form.id_Jenis)
    }
    await bukuService.createBukuFunction(payload)
    alert('Buku berhasil ditambahkan')
    Object.assign(form, {
      judul: '',
      id_Jenis: '',
      penulis: '',
      penerbit: '',
      tanggal_terbit: ''
    })
  } catch (err) {
    console.error('Gagal menambahkan buku:', err)
    alert('Terjadi kesalahan')
  } finally {
    loading.value = false
  }
}
</script>
