<template>
  <div class="pa-4">
    <!-- Header Card -->
    <v-card class="mb-6" elevation="2">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <div class="d-flex align-center">
          <v-icon size="large" color="primary" class="mr-3">mdi-book-multiple</v-icon>
          <div>
            <h2 class="text-h4 font-weight-bold">Manajemen Buku</h2>
            <p class="text-subtitle-1 text-medium-emphasis mt-1">
              Kelola koleksi buku perpustakaan
            </p>
          </div>
        </div>
        <div class="d-flex gap-2">
          <v-btn 
            color="primary" 
            variant="elevated"
            @click="openAddDialog"
            prepend-icon="mdi-plus"
          >
            Tambah Buku
          </v-btn>
          <v-btn 
            color="secondary" 
            variant="outlined"
            @click="refetch"
            :loading="isLoading"
          >
            <v-icon start>mdi-refresh</v-icon>
            Refresh
          </v-btn>
        </div>
      </v-card-title>
    </v-card>

    <!-- Main Content Card -->
    <v-card elevation="3">
      <!-- Search and Filter Bar -->
      <v-card-title class="pa-6 pb-2">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              label="Cari buku..."
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedJenis"
              :items="jenisOptions"
              label="Filter Jenis"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="pageSize"
              :items="[10, 25, 50, 100]"
              label="Per Halaman"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-title>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center pa-8">
        <v-progress-circular 
          indeterminate 
          color="primary" 
          size="60"
        />
        <p class="text-h6 mt-4">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="isError" class="pa-6">
        <v-alert type="error" variant="tonal">
          <v-alert-title>Gagal memuat data</v-alert-title>
          Terjadi kesalahan saat mengambil data buku.
          <template #append>
            <v-btn @click="refetch" variant="outlined" size="small">
              Coba Lagi
            </v-btn>
          </template>
        </v-alert>
      </div>

      <!-- Data Table -->
      <v-data-table
        v-else
        :headers="headers"
        :items="filteredItems"
        :items-per-page="pageSize"
        :items-length="pagination?.totalData || 0"
        v-model:page="currentPage"
        @update:page="onPageChange"
        class="elevation-0"
        hover
      >
        <template #item.id="{ item }">
          <v-chip size="small" color="grey" variant="outlined">
            {{ item.id }}
          </v-chip>
        </template>

        <template #item.judul="{ item }">
          <div class="d-flex flex-column">
            <span class="font-weight-medium">{{ item.judul }}</span>
            <span class="text-caption text-medium-emphasis">
              ISBN: {{ item.isbn || '-' }}
            </span>
          </div>
        </template>

        <template #item.tanggal_terbit="{ item }">
          <v-chip size="small" color="info" variant="outlined">
            {{ formatDate(item.tanggal_terbit) }}
          </v-chip>
        </template>
        
        <template #item.jenis="{ item }">
          <v-chip 
            :color="getJenisColor(item.jenisBuku?.namaJenis)" 
            size="small"
            variant="elevated"
          >
            {{ item.jenisBuku?.namaJenis || '-' }}
          </v-chip>
        </template>

        <template #item.aksi="{ item }">
          <div class="d-flex gap-1">
            <v-tooltip text="Edit">
              <template #activator="{ props }">
                <v-btn 
                  v-bind="props"
                  icon="mdi-pencil" 
                  size="small" 
                  color="primary"
                  variant="text"
                  @click="editItem(item)"
                />
              </template>
            </v-tooltip>
            <v-tooltip text="Hapus">
              <template #activator="{ props }">
                <v-btn 
                  v-bind="props"
                  icon="mdi-delete" 
                  size="small" 
                  color="error"
                  variant="text"
                  @click="confirmDelete(item)"
                />
              </template>
            </v-tooltip>
          </div>
        </template>

        <template #no-data>
          <div class="text-center pa-8">
            <v-icon size="80" color="grey-lighten-2">mdi-book-open-blank-variant</v-icon>
            <p class="text-h6 mt-4">Tidak ada data buku</p>
            <p class="text-body-2 text-medium-emphasis">
              Klik tombol "Tambah Buku" untuk menambahkan buku baru
            </p>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="800" persistent>
      <v-card>
        <v-card-title class="d-flex align-center pa-6 bg-primary">
          <v-icon class="mr-3" color="white">
            {{ isEdit ? 'mdi-pencil' : 'mdi-plus' }}
          </v-icon>
          <span class="text-h5 text-white">
            {{ isEdit ? 'Edit Buku' : 'Tambah Buku Baru' }}
          </span>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="form" v-model="formValid">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.judul"
                  label="Judul Buku"
                  variant="outlined"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-book"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.penulis"
                  label="Penulis"
                  variant="outlined"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-account-edit"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.penerbit"
                  label="Penerbit"
                  variant="outlined"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-domain"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.isbn"
                  label="ISBN"
                  variant="outlined"
                  prepend-inner-icon="mdi-barcode"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.tanggal_terbit"
                  label="Tanggal Terbit"
                  type="date"
                  variant="outlined"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-calendar"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.jenis_buku_id"
                  :items="jenisOptions"
                  item-title="text"
                  item-value="value"
                  label="Jenis Buku"
                  variant="outlined"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-tag"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.deskripsi"
                  label="Deskripsi"
                  variant="outlined"
                  rows="3"
                  prepend-inner-icon="mdi-text"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn @click="closeDialog" variant="outlined">
            Batal
          </v-btn>
          <v-btn 
            @click="saveItem" 
            color="primary"
            variant="elevated"
            :loading="saving"
            :disabled="!formValid"
          >
            {{ isEdit ? 'Update' : 'Simpan' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="d-flex align-center pa-6 bg-error">
          <v-icon class="mr-3" color="white">mdi-alert-circle</v-icon>
          <span class="text-h6 text-white">Konfirmasi Hapus</span>
        </v-card-title>

        <v-card-text class="pa-6">
          <p class="text-body-1">
            Apakah Anda yakin ingin menghapus buku:
          </p>
          <p class="text-h6 font-weight-bold mt-2">
            "{{ itemToDelete?.judul }}"
          </p>
          <p class="text-body-2 text-medium-emphasis mt-2">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn @click="deleteDialog = false" variant="outlined">
            Batal
          </v-btn>
          <v-btn 
            @click="deleteItem" 
            color="error"
            variant="elevated"
            :loading="deleting"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top right"
    >
      {{ snackbar.message }}
      <template #actions>
        <v-btn @click="snackbar.show = false" icon="mdi-close" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { bukuService } from '@/service/getBooks'

// Reactive variables
const currentPage = ref(1)
const pageSize = ref(25)
const searchQuery = ref('')
const selectedJenis = ref(null)

// Dialog states
const dialog = ref(false)
const deleteDialog = ref(false)
const isEdit = ref(false)
const saving = ref(false)
const deleting = ref(false)
const formValid = ref(false)

// Form data
const formData = ref({
  id: null,
  judul: '',
  penulis: '',
  penerbit: '',
  isbn: '',
  tanggal_terbit: '',
  jenis_buku_id: null,
  deskripsi: ''
})

// Item to delete
const itemToDelete = ref(null)

// Snackbar
const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

// Form validation rules
const rules = {
  required: value => !!value || 'Field ini wajib diisi'
}

// Create a reactive query key that includes pagination params
const queryKey = computed(() => ['buku', currentPage.value, pageSize.value])

const fetchBuku = async () => {
  const res = await bukuService.getAllBuku(currentPage.value, pageSize.value)
  return res.data // This should return the full response object
}

const { data, isLoading, isError, refetch } = useQuery({
  queryKey,
  queryFn: fetchBuku,
  keepPreviousData: true
})

// Computed properties
const filteredItems = computed(() => {
  let items = data.value?.data || []
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item => 
      item.judul?.toLowerCase().includes(query) ||
      item.penulis?.toLowerCase().includes(query) ||
      item.penerbit?.toLowerCase().includes(query)
    )
  }
  
  // Filter by jenis
  if (selectedJenis.value) {
    items = items.filter(item => 
      item.jenisBuku?.namaJenis === selectedJenis.value
    )
  }
  
  return items
})

const pagination = computed(() => data.value?.pagination)

const jenisOptions = computed(() => {
  const items = data.value?.data || []
  const jenisSet = new Set()
  
  items.forEach(item => {
    if (item.jenisBuku?.namaJenis) {
      jenisSet.add(item.jenisBuku.namaJenis)
    }
  })
  
  return Array.from(jenisSet).map(jenis => ({
    text: jenis,
    value: jenis // You might need to adjust this based on your API structure
  }))
})

// Event handlers
const onPageChange = (page) => {
  currentPage.value = page
}

const openAddDialog = () => {
  isEdit.value = false
  resetForm()
  dialog.value = true
}

const editItem = (item) => {
  isEdit.value = true
  formData.value = {
    id: item.id,
    judul: item.judul || '',
    penulis: item.penulis || '',
    penerbit: item.penerbit || '',
    isbn: item.isbn || '',
    tanggal_terbit: item.tanggal_terbit ? item.tanggal_terbit.split('T')[0] : '',
    jenis_buku_id: item.jenis_buku_id || null,
    deskripsi: item.deskripsi || ''
  }
  dialog.value = true
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    id: null,
    judul: '',
    penulis: '',
    penerbit: '',
    isbn: '',
    tanggal_terbit: '',
    jenis_buku_id: null,
    deskripsi: ''
  }
}

const saveItem = async () => {
  if (!formValid.value) return
  
  saving.value = true
  try {
    if (isEdit.value) {
      // Update existing book
      // await bukuService.updateBuku(formData.value.id, formData.value)
      showSnackbar('Buku berhasil diupdate', 'success')
    } else {
      // Create new book
      // await bukuService.createBuku(formData.value)
      showSnackbar('Buku berhasil ditambahkan', 'success')
    }
    
    closeDialog()
    refetch()
  } catch (error) {
    showSnackbar('Terjadi kesalahan saat menyimpan data', 'error')
  } finally {
    saving.value = false
  }
}

const deleteItem = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    // await bukuService.deleteBuku(itemToDelete.value.id)
    showSnackbar('Buku berhasil dihapus', 'success')
    deleteDialog.value = false
    itemToDelete.value = null
    refetch()
  } catch (error) {
    showSnackbar('Terjadi kesalahan saat menghapus data', 'error')
  } finally {
    deleting.value = false
  }
}

const showSnackbar = (message, color = 'success') => {
  snackbar.value = {
    show: true,
    message,
    color
  }
}

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getJenisColor = (jenis) => {
  const colors = {
    'Fiksi': 'purple',
    'Non-Fiksi': 'blue',
    'Akademik': 'green',
    'Referensi': 'orange',
    'Majalah': 'pink',
    'Komik': 'cyan'
  }
  return colors[jenis] || 'primary'
}

// Table headers
const headers = [
  { title: 'ID', key: 'id', align: 'center', width: '80px' },
  { title: 'Judul Buku', key: 'judul', width: '250px' },
  { title: 'Penulis', key: 'penulis', width: '180px' },
  { title: 'Penerbit', key: 'penerbit', width: '180px' },
  { title: 'Tanggal Terbit', key: 'tanggal_terbit', align: 'center', width: '150px' },
  { title: 'Jenis Buku', key: 'jenis', align: 'center', width: '130px' },
  { title: 'Aksi', key: 'aksi', align: 'center', sortable: false, width: '100px' }
]
</script>

<style scoped>
.v-card-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.v-data-table {
  border-radius: 0 0 12px 12px;
}

.v-chip {
  font-weight: 500;
}
</style>