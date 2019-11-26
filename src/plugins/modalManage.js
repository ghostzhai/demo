/* eslint-disable no-alert, no-console */
function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

const modalManagerPlugin = {
  install (Vue, options) {
    var node = document.createElement('div')
    document.body.appendChild(node)
    const modalManager = new Vue({
      name: 'modal manager',
      components: options.modals,
      render (h) {
        console.log('modal manager redraw')
        var renderList = []
        for (var i = 0; i < this.modalList.length; i++) {
          var modal = this.modalList[i]
          renderList.push(h(modal.name, {
            props: modal.props,
            on: {
              modalClose: this.close
            },
            key: modal.uuid
          }))
        }
        return h('div', {}, renderList)
      },
      methods: {
        close (uuid, data) {
          console.log('close modal', uuid, data)
          var modalIndex = -1
          for (var i = 0; i < this.modalList.length; i++) {
            if (this.modalList[i].uuid === uuid) {
              modalIndex = i
              break
            }
          }
          if (modalIndex > -1) {
            var modal = this.modalList[modalIndex]
            if (modal.callback) modal.callback(data)
            this.modalList.splice(modalIndex, 1)
          }
        }
      },
      data: {
        modalList: []
      }
    })
    modalManager.$mount(node)
    Vue.prototype.$open = function (name, props, callback) {
      if (typeof props === 'function') {
        callback = props
        props = {}
      } else {
        props = JSON.parse(JSON.stringify(props))
      }
      props._uuid = uuid()
      modalManager.modalList.push({
        uuid: props._uuid,
        name: name,
        props: props,
        callback: callback ? callback.bind(this) : undefined
      })
    }
    Vue.prototype.$close = function (data) {
      var key = this.$vnode.key
      this.$emit('modalClose', key, data)
      this.$destroy()
    }
  }
}
/* eslint-disable no-alert, no-console */
export default modalManagerPlugin
