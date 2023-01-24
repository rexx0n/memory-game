<template>
  <h1>Игра на память</h1>
  <p>Задача: найти одинаковые цифры, у вас ограниченное время, осталось найти {{ countClosedCard }}</p>
  <h1>{{ winner }}</h1>
  <div class="main">
    <div class="flex">
      <transition-group name="itemAnimation">
        <div @click="onClick(i,index)" class="item" v-for="(i,index) in pole" :key="index" :class="{'active': index === value}">
          <template v-if="value === index">{{ i }}</template>
          <template v-if="valueTwo === index">{{ i }}</template>
          <template v-if="open[index]">{{ i }}</template>
        </div>
      </transition-group>
    </div>
    <div class="menu">
      <p>Осталось время {{currentTime}}</p>
      <select @change="onChange" v-model="size">
        <option :value="6">Easy</option>
        <option :value="18">Medium</option>
        <option :value="36">Hard</option>
      </select>
      <button @click="reset">Заново</button>

    </div>
  </div>
</template>

<script>
import generatePole from "@/utils/generatePole";
// подкрашевать активные
// таймер на экране в обратную сторону
export default {
  name: 'MemoryGame',
  data() {
    return {
      size: 6,
      pole: [],
      value: '',
      valueTwo: '',
      open: [],
      timer: null,
      currentTime: 10,
      end:false,
      start: false,
    }
  },
  mounted() {
    this.reset()
    this.howTime()
  },
  unmounted() {
    this.stopTimer()
  },
  methods: {
    //перезаписать Pole на требуемое колво
    onChange() {
      this.reset()
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    },
    howTime () {
      if (this.size === 6) {
        this.currentTime = 10
      } else if(this.size === 18) {
        this.currentTime = 40
      }
      else {
        this.currentTime = 120
      }
    },
    reset() {
      this.value = ''
      this.valueTwo = ''
      this.pole = generatePole(this.size)
      this.open = Array.apply(null, {length: this.size}).map(() => false)
      this.end = false
      this.start = false
      this.howTime()
      this.stopTimer()
    },
    onClick(i, index) {
      if(this.end === true) {
        return
      }
      this.start = true
      if (this.value !== '' && this.valueTwo !== '') {
        this.value = ''
        this.valueTwo = ''
        clearTimeout(this.timed)
      }
      if (this.value === '') {
        //1 click
        this.value = index
        if (this.open[this.value]) {
          this.value = ''
        }
      } else {
        //2 click
        this.valueTwo = index
        if (this.open[this.valueTwo]) {
          this.valueTwo = ''
        }
        if (this.value === this.valueTwo) {
          this.valueTwo = ''
        }

        if (this.pole[this.value] === this.pole[this.valueTwo]) {
          this.open[this.value] = true
          this.open[this.valueTwo] = true
          this.value = ''
          this.valueTwo = ''
        } else if (this.valueTwo !== '') {
          this.timed = setTimeout(() => {
            this.value = ''
            this.valueTwo = ''
          }, 1000)

        }
      }
    },
  },
  computed: {
    checkWinner() {
      for (let i = 0; i < this.open.length; i++) {
        if (this.open[i] !== true) {
          return false;
        }
      }
      return true
    },
    winner() {
      if (this.checkWinner === true) {
        this.stopTimer()
        return 'Победа'
      } else if (this.currentTime === 0) {
        return "Ты не успел(а)"
      }
      return ''
    },
    countClosedCard() {
      return this.open.filter(el => el !== true).length
    }
  },
  watch: {
    currentTime(time) {
      if (time === 0 || this.winner === 'победа') {
        this.stopTimer()
        this.end = true
      }
    },
    start () {
      if (this.start === true) {
        this.startTimer()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.on-hover:hover + .hidden-block {
  opacity: 1;
  transition: 1s;
}

.menu {
  display: flex;
  flex-direction: column;

}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  min-width: 91px;
  min-height: 100px;
  box-shadow: inset 1px 1px 8px 14px #d2c2ac;
  background: #CCB494;
  margin: 10px;
  font-size: 60px;
}

.active {
  box-shadow:inset 1px 1px 8px 14px #ad997e
}

.itemAnimation-enter-active, .itemAnimation-leave-active {
  transition: all .5s;
}

.itemAnimation-enter, .itemAnimation-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.flex {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 700px;
  margin-left: 72px;
}


@media screen and (max-width: 834px) {
  .flex {
    max-width: 374px;
  }
}

@media screen and (max-width: 620px) {
  .item {
    min-width: 71px;
    min-height: 71px;
    font-size: 40px;
    margin: 5px;
  }

  .flex {
    max-width: 291px;
  }
}

@media screen and (max-width: 418px) {
  .item {
    min-width: 61px;
    min-height: 61px;
    font-size: 45px;
    margin: 3px;
  }

  .main {
    flex-direction: column;
    gap: 10px;
  }

  .menu {
    gap: 5px;
  }

  .flex {
    margin-left: 0;
    max-width: 275px;
  }
}
</style>