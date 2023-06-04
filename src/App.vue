<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>


export default {
mounted() {    
    this._keyListener = function(e) {
        let targetTagName = (e.target.nodeType == 1) ? e.target.nodeName.toUpperCase() : "";
        if (["INPUT", "SELECT", "TEXTAREA"].indexOf(targetTagName) != -1)
            return
        let index = this.$store.globalComponent['index'];  
        if (e.key === "b") {
            index.openMenuPanel('backpack')
        } else if (e.key === "s") {
            index.openMenuPanel('save')
        } else if (e.key === "x") {
            index.openMenuPanel('setting')
        } else if (e.key === "q") {
            index.openMenuPanel('quest')
        } else if (e.key === "d") {
            if(this.$store.state.guildAttribute.smith.lv >= 1)
                index.openMenuPanel('dungeon')
        } else if (e.key === "c") {
            if(this.$store.state.playerAttribute.lv >= 20)
                index.openMenuPanel('craft')
        }
    };

    document.addEventListener('keydown', this._keyListener.bind(this));
  }
}
</script>