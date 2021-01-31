<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settings.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settings.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="settings.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settings.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="settings.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="onUpdate"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click.prevent="onLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { update } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      settings: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapState(['user']),
  },
  middleware: 'authenticated',
  name: 'SettingsIndex',
  methods: {
    onLogout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')

      this.$router.push('/')
    },
    async onUpdate() {
      try {
        const { data } = await update({
          ...this.settings,
        })
        this.$store.commit('setUser', data.user)
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.error
      }
    },
  },
  mounted() {
    const { image, username, bio, email } = this.user
    this.settings = {
      image,
      username,
      bio,
      email,
      password: '',
    }
  },
}
</script>

<style></style>
