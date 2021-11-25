<template>
    <div ref="draggableContainer" id="draggable-container">
        <div id="draggable-header" @mousedown="dragMouseDown">
            <slot name="header"></slot>
        </div>
        <slot name="main"></slot>
    </div>
</template>

<script>
export default {
    name: 'DraggableDiv',
    data: function () {
        return {
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
            }
        }
    },
    props: {
        left_right: {
            type: Boolean,
            default: true,
        },
        top_bot: {
            type: Boolean,
            default: true,
        },
        left_limit: {
            type: Number,
            default: 0,
        },
        top_limit: {
            type: Number,
            default: 0,
        },
        right_limit: {
            type: Number,
            default: 0,
        },
        bot_limit: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        dragMouseDown: function (event) {
            event.preventDefault()
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            // set the element's new position:
            if(this.top_bot) {
                this.positions.movementY = this.positions.clientY - event.clientY;
                this.positions.clientY = event.clientY;
                let top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY);
                if(top<this.top_limit)
                    top = this.top_limit;
                if(this.bot_limit == 0) {
                    if(top>(document.body.clientHeight-50))
                        top = document.body.clientHeight-50;
                }
                else if(top>this.bot_limit)
                    top = this.bot_limit;
                this.$refs.draggableContainer.style.top = top + 'px';                
            }
            if(this.left_right) {
                this.positions.movementX = this.positions.clientX - event.clientX;
                this.positions.clientX = event.clientX;
                let left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX);
                if(left<this.left_limit)
                    left = this.left_limit;
                if(this.right_limit == 0) {
                    if(left>(document.body.clientWidth-50))
                        left = document.body.clientWidth-50;
                }
                else if(left>this.right_limit)
                    left = this.right_limit;
                this.$refs.draggableContainer.style.left = left + 'px';
            }
            this.$refs.draggableContainer.style.bottom = 'unset';
            this.$refs.draggableContainer.style.right = 'unset';
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
        }
    }
}
</script>

<style>
#draggable-container {
    position: absolute;
    /* z-index: 9; */
}
#draggable-header {
    position: absolute;
    height: 3.5rem;
    width: 100%;
    z-index: 5;
    /* cursor: move; */
}
</style>