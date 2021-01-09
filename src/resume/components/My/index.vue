<template>
  <div class="my">

    <div class="main-info">
      <div class="avatar">
        <img src="http://xinpuduoautoparts.cdn.test.douyait.cn/1610173160709_avatar.jpg" alt="">
      </div>

      <h2 class="name">樊致良</h2>

      <h3 class="job">Web前端</h3>

      <p class="info">男 / 24岁</p>

      <p class="info">广东技术师范学院天河学院 - 计算机科学与技术</p>

      <p class="info">本科 / 2019年毕业</p>
    </div>

    <div class="links">
      <p>
        <span class="icon">
          <i class="iconfont icongithub"></i>
        </span>
        <span class="value">https://github.com/Fanzhiliang</span>
      </p>
      <p>
        <span class="icon">
          <i class="iconfont iconmail"></i>
        </span>
        <span class="value">505911050@qq.com</span>
      </p>
      <p>
        <span class="icon">
          <i class="iconfont iconphone"></i>
        </span>
        <span class="value">13128269543</span>
      </p>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'My',
})
export default class extends Vue {

}
</script>

<style lang="scss">
.my {
  min-height: 100%;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30rem 20rem;

  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 50rem;
      height: 50rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: #FFFFFF;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .name {
      color: $primary-color;
      font-size: 20rem;
      margin: 10rem 0;
    }

    .job {
      color: $primary-color;
      margin-top: 0;
      margin-bottom: 10rem;
      font-weight: normal;
      font-size: 15rem;
    }

    .info {
      color: #6f6d6e;
      font-size: 10rem;
      text-align: center;
      margin: 5rem 0;
    }

    @media (max-width: $screen-xs-max) {
      .avatar {
        width: 100rem;
        height: 100rem;
      }

      .name {
        font-size: 30rem;
      }

      .job {
        font-size: 25rem;
      }

      .info {
        font-size: 18rem;
      }
    }
  }

  .links {
    p {
      display: block;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: middle;
      }

      .icon {
        width: 17rem;
        height: 17rem;
        border-radius: 50%;
        text-align: center;
        background-color: $primary-color;
        color: #FFFFFF;
        position: relative;
        i, i:before {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 50%;
          transform: translate(-50%, -50%);
          font-size: 10rem;
          height: 0;
          line-height: 0;
        }
      }

      .value {
        padding-left: 5rem;
        font-size: 11rem;
        color: #6f6d6e;
        transition: color 200ms;
      }

      &:hover {
        .value {
          color: $primary-color;
        }
      }
    }

  }

  @media (max-width: $screen-xs-max) {
    .links {
      text-align: center;

      p {
        display: inline-block;

        .icon {
          width: 40rem;
          height: 40rem;
          margin: 0 10rem;
          i, i:before {
            font-size: 25rem;
          }
        }

        .value {
          display: none;
        }
      }
    }
  }
}
</style>
