import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators'
import store from '../index'

export interface UserState {
  token: string
}

@Module({ name: 'user', store, dynamic: true })
class User extends VuexModule implements UserState {
  token = ''

  @Mutation
  setToken(data: string) {
    this.token = data
  }
}

export const UserModule = getModule(User)
