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
    py: {
      type: String,
    },
    px: {
      type: String,
    },
    my: {
      type: String,
    },
    mx: {
      type: String,
    },
    shadow: {
      type: Boolean,
      default: false
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
        'py-1': this.py === 'xsm',
        'py-2': this.py === 'xs',
        'py-3': this.py === 'sm',
        'py-4': this.py === 'md',
        'py-5': this.py === 'lg',

        'px-1': this.px === 'xsm',
        'px-2': this.px === 'xs',
        'px-3': this.px === 'sm',
        'px-4': this.px === 'md',
        'px-5': this.px === 'lg',

        'my-1': this.my === 'xsm',
        'my-2': this.my === 'xs',
        'my-3': this.my === 'sm',
        'my-4': this.my === 'md',
        'my-5': this.my === 'lg',

        'mx-1': this.mx === 'xsm',
        'mx-2': this.mx === 'xs',
        'mx-3': this.mx === 'sm',
        'mx-4': this.mx === 'md',
        'mx-5': this.mx === 'lg',

        'grid-cell_container__shadow': this.shadow,
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