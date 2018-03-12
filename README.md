# vue-beautiful-chat

`vue-beautiful-chat` provides an intercom-like chat window that can be included easily in any project for free. It provides no messaging facilities, only the view component.

`vue-beautiful-chat` is porting to vue of `react-beautiful-chat` (which you can find [here](https://github.com/mattmezza/react-beautiful-chat))

<a href="https://www.npmjs.com/package/vue-beautiful-chat" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/vue-beautiful-chat.svg" />
</a>
<a href="https://github.com/mattmezza/vue-beautiful-chat" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/mattmezza/vue-beautiful-chat.svg?style=social&label=Star" />
</a>

![gif](https://media.giphy.com/media/3ohs4wE4DqXw84xAMo/giphy.gif)

## Features

- Customizeable
- Backend agnostic
- Free

## [Demo](https://mattmezza.github.io/vue-beautiful-chat/)

## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Components](#api)

## Installation

```
$ yarn add vue-beautiful-chat
```

## Example
```javascript
import Chat from 'vue-beautiful-chat'
Vue.use(Chat)
```

```html
<template>
  <div>
    <beautiful-chat
      :agentProfile="agentProfile"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true" />
      <a href="#" @click.prevent="openChat()">Open the chat window</a>
  </div>
</template>
```
```javascript
export default {
  data() {
    return {
      agentProfile: {
        teamName: 'Vue Beautiful Chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      },
      messageList: [],
      newMessagesCount: 0,
      isChatOpen: false
    }
  },
  methods: {
    sendMessage (msg) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.messageList.push(msg)
      }
    },
    onMessageWasSent (msg) {
      this.messageList.push(msg)
    },
    openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      this.isChatOpen = false
    }
  }
}
```

For more detailed examples see the demo folder.

## Components

# Launcher

`Launcher` is the only component needed to use vue-beautiful-chat. It will react dynamically to changes in messages. All new messages must be added via a change in props as shown in the example.

Launcher props:

|prop | type   | description |
|-----|--------|---------------|
| *agentProfile | object | Represents your product or service's customer service agent. Fields: teamName, imageUrl|
| *onMessageWasSent | function(message) | Called when a message a message is sent with a message object as an argument. |
| *isOpen | Boolean | The bool indicating whether or not the chat window should be open. |
| *open | Function | The function passed to the component that mutates the above mentioned bool toggle for opening the chat |
| *close | Function | The function passed to the component that mutates the above mentioned bool toggle for closing the chat |
| messageList | [message] | An array of message objects to be rendered as a conversation. |
| showEmoji | Boolean | A bool indicating whether or not to show the emoji button
| showFile | Boolean | A bool indicating whether or not to show the file chooser button


### Message Objects

Message objects are rendered differently depending on their type. Currently, only text, emoji and file types are supported. Each message object has an `author` field which can have the value 'me' or 'them'.

``` javascript
{
  author: 'them',
  type: 'text',
  data: {
    text: 'some text'
  }
}

{
  author: 'me',
  type: 'emoji',
  data: {
    code: 'someCode'
  }
}

{
  author: 'me',
  type: 'file',
  data: {
    name: 'file.mp3',
    url: 'https:123.rf/file.mp3'
  }
}

```
