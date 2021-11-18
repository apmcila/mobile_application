<template>
  <div class="q-pa-md">
    <q-table
      :columns="columns"
      :data="users"
      @request="onRequest"
      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      row-key="id"
    />
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
      { name: 'gender', label: 'Gender', field: 'gender', align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'left' }
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
    this.fetchData();
  },
  methods: {
    fetchData(page=1) {
      axios
        .get(`${process.env.USERS_URL}?page=${page}`)
        .then(res => {
          this.users = res.data.data
          const paginationData = res.data.meta.pagination
          this.setPaginationObject(paginationData)
          this.loading = false
        })
        .catch(err => console.log('An error occured ', err))
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
    onRequest({pagination}) {
      this.fetchData(pagination.page);
    }
  }
}
</script>

<style>
</style>