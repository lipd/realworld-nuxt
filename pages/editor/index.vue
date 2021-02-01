<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-if="!slug"
                  v-model="tagInput"
                  @keyup.enter="onInputTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="onDeleteTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>

              <button
                v-if="!slug"
                @click.prevent="onSubmit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
              <button
                v-else
                @click.prevent="onUpdate"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Update Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
      slug: null,
      submitDisalbe: false,
      tagInput: '',
      article: {
        title: '',
        description: '',
        body: '',
        tags: [],
      },
    }
  },
  methods: {
    onInputTag() {
      this.article.tags.push(this.tagInput)
      this.tagInput = ''
    },
    onDeleteTag(tag) {
      const i = this.article.tags.findIndex(each => each === tag)
      this.article.tags.splice(i, 1)
    },
    async onSubmit() {
      try {
        const { data } = await createArticle({
          ...this.article,
        })
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
    async onUpdate() {
      try {
        const { title, description, body } = this.article
        await updateArticle({
          slug: this.slug,
          data: {
            title,
            description,
            body,
          },
        })
        this.$router.push(`/article/${this.slug}`)
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
  },
  async mounted() {
    const slug = this.$route.query.slug
    if (slug) {
      this.slug = slug
      this.submitDisalbe = true
      const { data } = await getArticle(slug)
      const { title, description, body } = data.article
      this.article = { title, description, body }
      this.submitDisalbe = false
    }
  },
}
</script>

<style></style>
