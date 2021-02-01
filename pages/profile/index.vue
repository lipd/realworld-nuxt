<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <nuxt-link
              v-if="me"
              :to="{
                name: 'settings',
              }"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              :disabled="followDisable"
              @click="onFollow(following)"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ following ? 'Unfollow' : 'Follow' }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username,
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact=""
                  class="nav-link"
                  :to="{
                    name: 'profile',
                    query: {
                      favorites: true,
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            class="article-preview"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{
                  article.createdAt | date('MMM DD, YYYY')
                }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>
                {{ article.title }}
              </h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { profile, follow, unfollow } from '@/api/user'
import { getArticles } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  data() {
    return {
      following: false,
      followDisable: false,
      me: false,
      articles: [],
    }
  },
  async asyncData({ params }) {
    const { data } = await profile(params.username)
    return {
      profile: data.profile,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async onFollow(following) {
      const api = following ? unfollow : follow
      this.followDisable = true
      try {
        const { data } = await api(this.profile.username)
        const { profile } = data
        this.following = profile.following
      } catch (err) {
        this.errors = err.response.data.errors
      }
      this.followDisable = false
    },
    async fetArticles() {
      this.me = this.profile.username === this.user.username
      this.following = this.profile.following

      const isFavorites = this.$route.query.favorites
      const name = this.profile.username
      const params = isFavorites ? { favorited: name } : { author: name }
      const { data } = await getArticles(params)
      this.articles = data.articles
    },
  },
  async mounted() {
    this.fetArticles()
  },
  watchQuery() {
    this.fetArticles()
  },
}
</script>
