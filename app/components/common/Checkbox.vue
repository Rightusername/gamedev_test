<template>
    <div @click="toggle" class="app-checkbox">
        <div class="track">
            <div class="thumb" v-bind:class="{checked: !value}"></div>
        </div>
    </div>
</template>

<script>



export default {
    name: 'Checkbox',
    props: ['value'],
    components: {

    },
    created() {
    },

    data() {
        return {
        }
    },


    methods: {
        toggle(e) {
            if(this.value) {
                this.$emit('input', false);
            } else {
                this.$emit('input', true);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~styles/style.scss";
    @import "~styles/pages/main.scss";

    
    .app-checkbox{
        width: 22px;
        height: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;

        .track{
            height: 8px;
            width: 100%;
            border-radius: 4px;
            background: #9b9b9b;
            position: relative;
            

            .thumb{
                position: absolute;
                top: -4px;
                left:-4px;
                width: 16px;
                height: 16px;
                background: #168aec;
                border-radius: 50%;
                transition: all .2s ease-out;

                &.checked{
                    background: #565656;
                    left: calc(100% - 12px);
                }
            }
        }
    }


</style>
