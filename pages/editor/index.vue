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
                @click.prevent="onSubmit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
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
  },
}
</script>

<style></style>
