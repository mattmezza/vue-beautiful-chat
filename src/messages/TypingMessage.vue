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
            let name1 = '';
            let name2 = '';
            switch (this.typingUserArray.length) {
                case 0:
                    return '';
                case 1:
                    name1 = this.getUserName(0);
                    return name1 + ' schreibt gerade ...';
                case 2:
                    name1 = this.getUserName(0);
                    name2 = this.getUserName(1);
                    return name1 + ' und ' + name2 + ' schreiben gerade ...';
                default:
                    name1 = this.getUserName(0);
                    name2 = this.getUserName(1);
                    return name1 + ' und ' + name2 + ' und ' + (this.typingUserArray.length - 2) + ' weitere schreiben gerade ...';
            }
        },
        getUserName(index) {
            return this.participants.filter(value => {
                return value.id === this.typingUserArray[index]
            })[0].name
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
