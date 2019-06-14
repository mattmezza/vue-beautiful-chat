<template>
	<div style="position: relative">
		<button
		  class="sc-user-input--file-icon-wrapper"
		  type='button'
		>
		  <svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			class="sc-user-input--file-icon"
			x='0px'
			y='0px'
			width='24px'
			height='24px'
			viewBox='0 0 37.393 37.393'
			enableBackground='new 0 0 37.393 37.393'
		  >
			<path :style="{fill: color}" d="M20.807 10.22l-2.030-2.029-10.15 10.148c-1.682 1.681-1.682 4.408 0 6.089s4.408 1.681 6.090 0l12.18-12.178c2.804-2.802 2.804-7.346 0-10.148-2.802-2.803-7.347-2.803-10.149 0l-12.788 12.787c-0.009 0.009-0.019 0.018-0.027 0.026-3.909 3.909-3.909 10.245 0 14.153 3.908 3.908 10.246 3.908 14.156 0 0.009-0.009 0.016-0.018 0.026-0.027l0.001 0.001 8.729-8.728-2.031-2.029-8.729 8.727c-0.009 0.008-0.018 0.018-0.026 0.026-2.784 2.783-7.312 2.783-10.096 0-2.783-2.783-2.783-7.31 0-10.093 0.010-0.009 0.019-0.018 0.028-0.026l-0.001-0.002 12.79-12.786c1.678-1.679 4.411-1.679 6.090 0s1.678 4.411 0 6.089l-12.18 12.178c-0.56 0.56-1.47 0.56-2.030 0-0.559-0.559-0.559-1.47 0-2.029l10.15-10.149z"></path>
		  </svg>
		<input type='file' id='file-input' @change="_handleChange" @click="_handleClick" />
		</button>
	</div>
</template>

<script>
export default {
  props: {
    onChange: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    _handleClick (e) {
      e.target.value = null
    },
    _handleChange (e) {
      this.onChange(e.target.files[0])
    }
  }
}
</script>

<style scoped>
#file-input {
  cursor: pointer;
}

.sc-user-input--file-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  cursor: pointer;
}

.sc-user-input--file-icon {
  height: 20px;
  width: 20px;
  align-self: center;
  outline: none;
}

.sc-user-input--file-icon:hover path {
  filter: contrast(15%);
}
</style>
