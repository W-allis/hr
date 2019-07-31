<template>
  <div>
    <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562142702402&di=53e5b6f08fa2ce613c3eada8adc32adf&imgtype=0&src=http%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fl46vyRPTiitlKyta0nVFx41wKfK.jpg" alt="" srcset=""> -->
    <button v-throttle="1000" @click="handleClick()">ceshi</button>  
    <div v-text="value"></div>
  </div>
</template>

<script>
export default {
  directives: {
    throttle: {
      inserted(el, binding) {
        console.dir(el)
        el.draggable = true
        // el.removeEventListener('click')
        function _(time) {
          let startTime = 0
          let timer
          return () => {
            let endTime = new Date()
            el.disabled = true
            clearTimeout(timer)

            timer = setTimeout(_ => {
              el.disabled = false
              startTime = endTime
            }, binding.value || 3000)

          }
        }

        el.addEventListener('click', _(binding.vlaue))
      }
    }
  },
  data() {
    return {
      disabled: false,
      value: '12\n34'
    }
  },
  methods: {
    handleClick(time) {
      console.log(123)
    }
  },
  computed: { 
    
  },
  created() {
    console.log('i am groot')
  }
}
</script>


