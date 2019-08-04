export default {
  data() {
    return {
      queryModel: {
        pageSize: 20,
        pageNum: 1
      },
      degreeList: [...Array(20).keys()].map(item => ({ title: 'web前端开发工程师', department: '信息科技部', type: '营销类', isInternship: [true, false][Math.round(Math.random())], jobCity: '上海' })),
    }
  },
  methods: {
    handleSearch() {
      console.log(this.queryModel)
    }
  }
}