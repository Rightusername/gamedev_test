import Vue from 'vue';

let downOutside = Vue.directive('downOutside', {
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = event => {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('mousedown', el.clickOutsideEvent)
  },
  unbind: el => {
    document.body.removeEventListener('mousedown', el.clickOutsideEvent)
  },
});

export { downOutside };
