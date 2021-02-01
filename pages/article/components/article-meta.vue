<template>
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
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="mine">
      <a class="btn btn-outline-secondary btn-sm">
        <i class="ion-edit"></i> Edit Article
      </a>

      <button @click="onDelete" class="btn btn-outline-danger btn-sm">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true,
    },
    mine: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async onDelete() {
      const slug = this.article.slug
      try {
        await deleteArticle(slug)
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
  },
}
</script>
