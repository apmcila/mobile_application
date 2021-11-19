<template>
  <div class="q-pa-md">
    <q-table
      row-key="id"
      class="sticky-header"
      :columns="columns"
      :data="users"
      :loading="loading"
      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      @request="onRequest"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          label="Create User"
          icon="add"
          padding="sm"
          outline
          @click="addRow"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th> Actions </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.rowIndex}`">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn padding="xs">
              <div class="row no-wrap">
                Action
                <q-icon name="arrow_drop_down"></q-icon>
              </div>
              <q-menu fit anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>Edit</q-item-section>
                    <q-item-section side>
                      <q-icon name="edit" size="xs" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Delete</q-item-section>
                    <q-item-section side>
                      <q-icon name="delete" color="red-6" size="xs" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Users',
  data() {
    const columns = [
      { name: 'id', label: 'ID', required: true, field: 'id', align: 'left' },
      { name: 'name', label: 'Name', field: 'name', align: 'left' },
      { name: 'email', label: 'Email', field: 'email', align: 'left' },
      { name: 'gender', label: 'Gender', field: 'gender', align: 'left' }
    ]
    const pagination = {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 20,
      rowsNumber: 1
    }

    return {
      users: [],
      columns,
      pagination,
      loading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    print(data) {
      console.log(data)
    },
    fetchData(page = 1) {
      this.loading = true
      axios
        .get(`${process.env.USERS_URL}?page=${page}`)
        .then(res => {
          this.users = res.data.data
          const paginationData = res.data.meta.pagination
          this.setPaginationObject(paginationData)
          this.loading = false
        })
        .catch(err => console.log('An error occured ', err))
        .finally(() => (this.loading = false))
    },
    setPaginationObject(paginationData) {
      this.pagination = {
        sortBy: 'desc',
        descending: false,
        page: paginationData.page,
        rowsPerPage: paginationData.limit,
        rowsNumber: paginationData.total
      }
    },
    onRequest({ pagination }) {
      this.fetchData(pagination.page)
    }
  }
}
</script>

<style lang="scss">
.sticky-header {
  height: 95vh;

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  .q-table__bottom,
  thead tr:first-child th {
    background-color: #e7e7e7;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }

  tbody tr:nth-child(even) {
    background: #eaf0ff;
  }
}
</style>