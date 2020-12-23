<template>
  <label class="sc-user-input--file-icon-wrapper" role="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="sc-user-input--file-icon"
      width="20"
      height="20"
      viewBox="0 0 31.4 34.4"
    >
      <path
        :style="{fill: color}"
        d="M20.8 10.22l-2.02-2.03L8.63 18.34a4.3 4.3 0 106.09 6.09L26.9 12.25A7.17 7.17 0 1016.75 2.1L3.96 14.9l-.03.02A10 10 0 1018.1 29.07l.02-.03 8.73-8.73-2.03-2.02L16.1 27l-.03.03a7.15 7.15 0 01-10.1-10.1l.03-.02L18.78 4.13a4.31 4.31 0 016.09 6.09L12.69 22.4a1.44 1.44 0 01-2.03-2.03l10.15-10.15z"
      />
    </svg>
    <input type="file" @change="_handleChange" />
  </label>
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
    _handleChange(e) {
      this.onChange(e.target.files[0])
    }
  }
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}

.sc-user-input--file-icon-wrapper {
  display: block;
  cursor: pointer;
}

.sc-user-input--file-icon {
  display: block;
}
</style>
