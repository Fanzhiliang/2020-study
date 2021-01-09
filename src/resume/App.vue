<template>
  <div id="app">
    <my-row class="resume-wrap" type="flex" align="stretch">
      <my-col :span="7" :xs="24">
        <My />
      </my-col>
      <my-col :span="17" :xs="24">
        <Info />
      </my-col>
    </my-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Row, Col } from '@/components/Grid'
import My from './components/My/index.vue'
import Info from './components/Info/index.vue'
import Variable from './styles/variable.module.scss'
import Rem from '@/utils/rem'

@Component({
  name: 'App',
  components: {
    MyRow: Row,
    MyCol: Col,
    My,
    Info,
  },
})
export default class extends Vue {
  created() {
    Rem.init(parseInt(Variable.maxWidth))
  }

  beforeDestroy() {
    Rem.destroy()
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  min-height: 100%;
  background-color: $bg-color;
}

#app {
  max-width: $max-width;
  margin: 30px auto;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px rgba(136, 136, 136, 0.2);
}

.resume-wrap {
  min-height: 100%;
}

@media (max-width: $screen-xs-max) {
  #app {
    margin-top: 0;
    margin-bottom: 0;
  }

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
