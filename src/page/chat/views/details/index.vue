<template>
  <div class="hr-degree-details-container">

    <hr-card :title="degreeDetails.title" :hide-tag="!degreeDetails.isInternship" :hide-operator="true" :tag="'实习生'">
      <li class="overflowtext">
        {{degreeDetails.department}}
      </li>
      <li class="hr-degree-details-company overflowtext">
        <span>{{degreeDetails.company}}</span>
        <span>{{degreeDetails.jobCity}}</span>
      </li>
    </hr-card>
    <hr-degree-share></hr-degree-share>
    <hr-card :title="'工作职责'" :hide-tag="true" :hide-operator="true" :style="{ marginTop: '10px' }">
      <li>
        1.研究汽车金融市场，协助推动对公业务新增长模式的探索和搭建（如网约车、汽车后市场等）。
      </li>
      <li>
        2. 研究现有业务市场，创新衍生业务模式和产品，搭建和整合业务流程、交易结构、授信逻辑、拓展方式。
      </li>
    </hr-card>
    <hr-card :title="'任职资格'" :hide-tag="true" :hide-operator="true">
      <li>
        1.研究汽车金融市场，协助推动对公业务新增长模式的探索和搭建（如网约车、汽车后市场等）。
      </li>
      <li>
        2. 研究现有业务市场，创新衍生业务模式和产品，搭建和整合业务流程、交易结构、授信逻辑、拓展方式。
      </li>
    </hr-card>
    <div class="hr-degree-details-sendResume">
      <cube-button class="sendResume">
        立即投递
      </cube-button>
    </div>
  </div>
</template>

<script>
import hrDegreeShare from '../share'

export default {
  components: {
    hrDegreeShare
  },
  data() {
    return {
      degreeDetails: {
        title: 'java',
        isInternship: false,
        department: '技术部',
        company: '云南信托',
        jobCity: '上海'
      }
    }
  }
}
</script>

<style>
  .hr-degree-details-company {
    display: flex;
    justify-content: space-between;
  }
  .hr-degree-details-container .hr-card-container {
    margin-bottom: 0;
    border-bottom: 0.5px solid #eee;
  }
</style>

<style lang="less" scoped>
  @import '../../style/variable.less';
  @height: 50px;
  .hr-degree-details-container {
    padding-bottom: @height;
  }
  .hr-degree-details-sendResume {
    padding-top: 8px;
    background: #ccc;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .sendResume {
    color: @main-color;
    height: @height;
    background: #fff;
  }

</style>
