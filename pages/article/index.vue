<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" :mine="mine" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" :mine="mine" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue'

const md = new MarkdownIt()

export default {
  components: { ArticleMeta, ArticleComments },
  data() {
    return {
      mine: false,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    article.body = md.render(article.body)
    return {
      article: data.article,
    }
  },
  mounted() {
    if (!this.user) return
    this.mine = this.user.username === this.article.author.username
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
}
</script>

<style></style>
