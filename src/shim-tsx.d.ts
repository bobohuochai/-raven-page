import Vue, { VNode } from 'vue'
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    interface ElementAttributesProperty {
      _attrs: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_ENV: string
      VUE_APP_URL: string
      VUE_APP_BASEURL: string
      VUE_APP_LOGINURL: string
      VUE_APP_FXT_URL: string
    }
  }
}
