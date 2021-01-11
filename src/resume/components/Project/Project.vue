<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ProjectData } from './types'

@Component({
  name: 'Project',
})
export default class extends Vue {
  render() {
    return (
      <div class='project'>
        <div class='title'>
          <div class='name'>{ this.data.name }</div>

          { this.data.link && (
            <a class='link' href={ this.data.link } target='_blank'>{ this.data.link }</a>
          )}
          { this.data.info && (
            <div class='info'>{ this.data.info }</div>
          )}

        </div>
        <p class='detail'>
          { this.data.tags.map(tag => (
            <span class='tag'>{ tag }</span>
          )) }
          <span class='value'>{ this.data.detail }</span>
        </p>
      </div>
    )
  }

  @Prop({
    type: Object,
    default: () => ({}),
  })
  data!: ProjectData
}
</script>

<style lang="scss">
@mixin normal-text {
  font-size: 10rem;
  color: $text-color;
  vertical-align: middle;
}

.project {
  @include normal-text;
  padding-bottom: 10rem;
  .title {
    font-size: 0;
    letter-spacing: 0;
    & > * {
      @include normal-text;
      font-size: 11.5rem;
    }
    .name {
      @include ellipsis;
      display: inline-block;
      color: #333333;
      font-weight: bold;
    }

    .info {
      @include ellipsis;
      display: inline-block;
      font-size: 12rem;
      padding-left: 20rem;
    }

    .link {
      @include ellipsis;
      display: inline-block;
      padding-left: 20rem;
      &:hover {
        color: $primary-color;
      }
    }
  }

  .detail {
    .tag {
      background-color: #F5F5F5;
      color: #666666;
      font-size: 9rem;
      font-weight: bold;
      padding: 2rem 5rem;
      display: inline-block;
      border-radius: 3rem;
      margin-right: 5rem;
    }
  }
}

@media (max-width: $screen-xs-max) {
  .project {
    font-size: 20rem;

    .title {
      .info {
        font-size: 22rem;
      }
      .name {
        font-size: 20rem;
      }
    }

    .detail {
      .tag {
        font-size: 18rem;
      }
    }
  }
}
</style>
