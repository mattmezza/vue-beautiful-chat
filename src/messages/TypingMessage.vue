<template>
    <div class="sc-typing-indicator" :style="messageColors">
        <span></span>
        <span></span>
        <span></span>
        {{this.getTypingUserNameString()}}
    </div>
</template>

<script>
export default {
    props: {
        messageColors: {
            type: Object,
            required: true
        },
        typingUserArray: {
            type: Array,
            required: true
        },
        participants: {
            type: Array,
            required: true
        }
    },
    methods: {
        getTypingUserNameString() {
            switch (this.typingUserArray.length) {
                case 0:
                    return '';
                case 1:
                    return this.participants.filter(value => {
                        return value.id === this.typingUserArray[0]
                    })[0].name + ' schreibt gerade ...';
                case 2:
                    return this.participants.filter(value => {
                        return value.id === this.typingUserArray[0]
                    })[0].name + ' und ' + this.participants.filter(value => {
                        return value.id === this.typingUserArray[1]
                    })[0].name + ' schreiben gerade ...';
                default:
                    return this.participants.filter(value => {
                        return value.id === this.typingUserArray[0]
                    })[0].name + ', ' + this.participants.filter(value => {
                        return value.id === this.typingUserArray[1]
                    })[0].name + 'und ' + this.typingUserArray.length - 2 + ' weitere schreiben gerade ...';
            }
        }
    }
}
</script>

<style scoped>
.sc-typing-indicator {
    text-align: center;
    padding: 17px 20px;
    border-radius: 6px;
}

.sc-typing-indicator span {
    display: inline-block;
    background-color: #b6b5ba;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 3px;
    animation: bob 2s infinite;
}

/* SAFARI GLITCH */
.sc-typing-indicator span:nth-child(1) {
    animation-delay: -1s;
}

.sc-typing-indicator span:nth-child(2) {
    animation-delay: -0.85s;
}

.sc-typing-indicator span:nth-child(3) {
    animation-delay: -0.7s;
}

@keyframes bob {
    10% {
        transform: translateY(-10px);
        background-color: #9e9da2;
    }
    50% {
        transform: translateY(0);
        background-color: #b6b5ba;
    }
}
</style>
