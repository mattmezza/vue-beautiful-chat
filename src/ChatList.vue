<template>
  <div class="chat-list" :style="{background: colors.chatList.bg}">
    <table>
      <tbody>
        <tr v-for="chat in chatList" :key="chat.id" @click="openChat(chat.id)">
          <td class="chat-img-td">
            <img :src="chat.imageUrl" class="chat-img" />
          </td>
          <td class="chat-name-td" :style="{color: colors.chatList.text}">
            {{ chat.name }}
          </td>
          <td class="badge-td">
            <svg width="22px" height="22px" viewBox="0 0 32 32" class="bi bi-circle-fill chat-badge" :fill="chat.unreadCount ? colors.chatListBadge.bg : colors.chatList.bg" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16"/>
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" :fill="chat.unreadCount ? colors.chatListBadge.text : colors.chatList.bg">
                {{ chat.unreadCount }}
              </text>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    chatList: {
      type: Array,
      required: false
    },
    colors: {
      type: Object,
      required: true
    },
  },
  methods: {
    openChat(chatID) {
      this.$emit('changeCurrentChat', chatID)
      this.$emit('showMessageList')
    }
  }
}
</script>

<style scoped>
.chat-list {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
}
.chat-img-td {
  box-sizing: border-box;
  text-align: center;
  width: 50px;
}
.chat-img {
  box-sizing: border-box;
  border-radius: 50%;
  width: 50px;
  margin-right: 5px;
  display: block;
}
.chat-name-td {
  box-sizing: border-box;
  font-size: 20px;
  vertical-align: middle;
  text-align: left;
}
.badge-td {
  box-sizing: border-box;
  vertical-align: middle;
  text-align: center;
  width: 24px;
}
.chat-badge {
  box-sizing: border-box;
  font-size: 17px;
}
table {
  box-sizing: border-box;
  width: 100%;
}
tr>td {
  padding-top: 5px;
}
</style>
