<template>
    <div class="sc-suggestions-row" :style="{background: colors.messageList.bg}">
        <button class="sc-suggestions-element" v-for="(suggestion, idx) in suggestions" v-on:click="$emit('sendSuggestion', suggestion)" 
        :style="{borderColor: colors.sentMessage.bg, color: colors.sentMessage.bg}" :key="idx">{{suggestion}}</button>
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
  background: inherit;
}

.sc-suggestions-element {
  margin: 3px;
  padding: 5px 10px 5px 10px;
  border: 1px solid;
  border-radius: 15px;
  font-size: 14px;
  background: inherit;
  cursor: pointer;
}
</style>