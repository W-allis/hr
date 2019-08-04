export default {
  data() {
    return {
    }
  },
  methods: {
    afterCardClick(id) {
      this.$router.push({ path: '/details', query: { id } })
    }
  }
}