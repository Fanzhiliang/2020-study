<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Info } from '../api/resume'
import { handleClipboard } from '@/utils/clipboard'

@Component({
  name: 'My',
})
export default class extends Vue {
  render() {
    return (
      <div class='my'>
        <div class='main-info'>
          <div class='avatar'>
            <img src='http://xinpuduoautoparts.cdn.test.douyait.cn/1610173160709_avatar.jpg' alt='' />
          </div>

          <h2 class='name'>{ this.data.name }</h2>

          <h3 class='job'>{ this.data.job }</h3>

          <p class='info'>{ this.data.gender } / { this.data.age }岁</p>

          <p class='info'>{ this.data.school } - { this.data.major }</p>

          <p class='info'>{ this.data.education } / { this.data.graduationYear }年毕业</p>
        </div>

        <div class='links'>
          {
          // <p>
          //   <span class="icon">
          //     <i class="iconfont icongithub"></i>
          //   </span>
          //   <span class="value">{ this.data.github }</span>
          // </p>
          }
          <p onClick={ (e) => this.handleCopy(e, this.data.email) }>
            <span class='icon'>
              <i class='iconfont iconmail'></i>
            </span>
            <span class='value'>{ this.data.email }</span>
          </p>
          <p onClick={ (e) => this.handleCopy(e, this.data.phone) }>
            <span class='icon'>
              <i class='iconfont iconphone'></i>
            </span>
            <span class='value'>{ this.data.phone }</span>
          </p>
        </div>
      </div>
    )
  }

  @Prop({
    type: Object,
    default: () => ({}),
  })
  data!: Info

  // 复制邮箱
  handleCopy(e, text = '') {
    handleClipboard(text, e)
  }
}
</script>

<style lang="scss" scoped>
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
      color: $text-color;
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
        color: $text-color;
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
