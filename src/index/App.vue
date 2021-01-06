<template>
  <div id="app">
    <div class="msg">
      <ul class="links">
        <li class="link" v-for="(item, index) in links" :key="index">
          <router-link :to="{ name: item.name }">{{ item.title }}</router-link>
        </li>
      </ul>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: [
        { title: '首页', name: 'Home' },
        { title: '关于', name: 'About' },
      ],
    }
  },
}
</script>

<style lang="scss">
  $color: #FFFFFF;

  .msg {
    @include ellipsis;
    color: $color;
  }

  .links {
    list-style: none;
    padding: 0 10px;
    .link {
      list-style: none;
      display: inline-block;
      margin: 0 10px;
      a {
        color: #000;

        &.router-link-exact-active {
          color: #F0F0F0;
        }
      }
    }
  }
</style>
