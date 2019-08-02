export default {
  data() {
    return {
      searchTab: '1234',
      searchtabList: [...Array(3).keys()].map(item => ({ name: ['专业公司', '职位类别', '工作城市'][item] })),
    }
  },
  methods: {
    afterTabClick(target) {
      console.log(target)
      this.$router.push({ path: '/search', query: { from: this.$route.path, target } })
    }
  }
}