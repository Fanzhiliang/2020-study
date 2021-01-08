<template>
  <div id="app">
    <my-row class="resume-wrap" type="flex" align="stretch">
      <my-col :span="6" :xs="24">
        <div class="block block-head">头部</div>
      </my-col>
      <my-col :span="18" :xs="24">
        <div class="block block-main">内容</div>
      </my-col>
    </my-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Row, Col } from '@/components/Grid'

@Component({
  name: 'App',
  components: {
    MyRow: Row,
    MyCol: Col,
  },
})
export default class extends Vue {

}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  min-height: 100%;
  background-color: #FFFFFF;
}

#app {
  max-width: $max-width;
  margin: 0 auto;
}

.resume-wrap {
  min-height: 100%;
}

@media (max-width: $screen-xs-max) {
  .resume-wrap {
    min-height: auto;
  }
}

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 16px;

  &-head {
    background-color: red;
  }

  &-main {
    background-color: blue;
  }
}
</style>
