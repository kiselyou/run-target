import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Cell', {
  props: {
    content: {
      type: [String, Number],
    },
    beforeContent: {
      type: [String, Number],
    },
    afterContent: {
      type: [String, Number],
    },
    size: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    },
    containerWidth: {
      type: [Number, String],
      default: null
    },
    bold: {
      type: Boolean,
      default: false
    },
    align: {
      type: [Boolean, String],
      default: null
    },
    alignContainer: {
      type: [Boolean, String],
      default: null
    },
    padding: {
      type: String,
    },
    hover: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    htmlClass: function () {
      return {
        'grid-cell__left': this.align === 'left',
        'grid-cell__right': this.align === 'right',
        'grid-cell__center': this.align === true || this.align === 'center',
      }
    },
    htmlStyle: function () {
      return {
        'width': this.width,
      }
    },
    htmlClassContainer: function () {
      return {
        'grid-cell_container__pxs': this.padding === 'xs',
        'grid-cell_container__psm': this.padding === 'sm',
        'grid-cell_container__pmd': this.padding === 'md',
        'grid-cell_container__plg': this.padding === 'lg',
        'grid-cell_container__hover': this.hover,
        'grid-cell__center': this.alignContainer === true || this.alignContainer === 'center',
      }
    },
    htmlStyleContainer: function () {
      return {
        'width': this.containerWidth,
      }
    },
    htmlClassContent: function () {
      return {
        'grid-cell_content__xs': this.size === 'xs',
        'grid-cell_content__sm': this.size === 'sm',
        'grid-cell_content__md': this.size === 'md',
        'grid-cell_content__lg': this.size === 'lg',
        'grid-cell_content__xlg': this.size === 'xlg',
        'grid-cell_content__bold': this.bold,
        'grid-cell_content__underline': this.underline,
      }
    },
  },
  methods: {
    click: function (e) {
      this.$emit('click', e)
    }
  },
  template: template
})