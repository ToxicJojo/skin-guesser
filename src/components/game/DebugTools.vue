<template lang="pug">
  .debug-tools
    label Displayed Skin:
    ChampionSelect(:value='currentChampion' @input='$emit("changeChampion", $event)')
    SkinSelect(:value='currentSkin' :champion='currentChampion' @input='$emit("changeSkin", $event)')
    button(@click='$emit("showNextSkin")') Random Skin
    br
    label Radius
      input(type='range' min='0' max='100' v-model='clipData.radius')
    label X
      input(type='range' min='0' max='100' v-model='clipData.x')
    label Y
      input(type='range' min='0' max='100' v-model='clipData.y')
    button(@click='$emit("randomizeClipping")') Random Clipping
    button(@click='$emit("revealSkin")') Reveal Skin
</template>

<script>
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'

export default {
  name: 'DebugTools',
  components: {
    ChampionSelect,
    SkinSelect,
  },
  props: {
    currentChampion: {
      type: Object,
      required: true,
    },
    currentSkin: {
      type: Object,
      required: true,
    },
    clipData: {
      type: Object,
      required: true,
    },
  },
}
</script>
