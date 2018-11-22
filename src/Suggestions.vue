<template>
    <div class="sc-suggestions-row">
        <button class="sc-suggestions-element" v-for="(suggestion, idx) in suggestions" v-on:click="$emit('sendSuggestion', suggestion)" 
        :style="{borderColor: colors.bg, background: colors.bg, color: colors.text}">{{suggestion}}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        suggestions: {
            type: Array,
            default: () => []
        },
        colors: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.sc-suggestions-row {
  text-align: center;
}

.sc-suggestions-element {
  margin: 3px;
  border-radius: 10px;
  font-size: 14px;
}
</style>