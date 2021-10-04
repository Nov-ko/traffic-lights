<template>
  <div id="app">
    <div class="circle red"></div>
    <div class="circle yellow"></div>
    <div class="circle green"></div>
    <h3>{{ currentTime }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: null,
      timer: null,
      blink: null,
      lastColor: null,
    };
  },

  mounted() {
    this.startTimer();
    this.changeTime();
    this.changeColorOff();
    if (localStorage.prevRoute == this.$route.name) {
      this.currentTime = localStorage.currentTime;
    }
  },

  // destroy() {
  //   this.stopTimer();
  // },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },

    // stopTimer() {
    //   clearTimeout(this.timer);
    // },

    changeColor() {
      if (this.$route.name == "yellow") {
        if (this.lastColor == "red") {
          this.$router.push({ name: "green" });
        } else {
          this.$router.push({ name: "red" });
        }
      } else {
        this.$router.push({ name: "yellow" });
      }
    },

    changeTime() {
      if (this.$route.name != "yellow") {
        this.lastColor = this.$route.name;
        if (this.$route.name == "green") this.currentTime = 15;
        else this.currentTime = 30;
      } else this.currentTime = 3;
    },

    changeColorOff() {
      let items = document.querySelectorAll("div.circle");
      for (let item of items) {
        if (!item.matches(`.${this.$route.name}`)) item.classList.add("off");
        else item.classList.remove("off");
      }
    },

    // startBlinkColor() {
    //   this.blink = setInterval(() => {
    //     setTimeout(() => {
    //       document.querySelector(`.${this.$route.name}`).style.opacity = "0.3";
    //     }, 500);
    //     document.querySelector(`.${this.$route.name}`).style.opacity = "1";
    //   }, 1000);
    // },

    stopBlinkColor() {
      // clearTimeout(this.blink);
      let items = document.querySelectorAll("div.circle");
      for (let item of items) {
        item.style.opacity = "1";
      }
    },

    blinkColor() {
      document.querySelector(`.${this.$route.name}`).style.opacity = "0.3";
      setTimeout(() => {
        document.querySelector(`.${this.$route.name}`).style.opacity = "1";
      }, 500);
    },
  },

  watch: {
    currentTime(time) {
      if (time == 0) this.changeColor();
      if (time <= 3) this.blinkColor();
      // if (time == 3) this.startBlinkColor();
      localStorage.currentTime = this.currentTime;
      localStorage.prevRoute = this.$route.name;
    },

    // смена URL
    "$route.path"() {
      this.changeTime();
      this.changeColorOff();
      this.stopBlinkColor();
    },
  },
};
</script>

<style scoped>
.circle {
  width: 20px;
  height: 20px;
  margin: 20px;
  padding: 20px;
  border: solid 1px #0a325f;
  font-size: 20px;
  border-radius: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.green {
  background-color: #00ff00;
  box-shadow: 0 0 25px #32cd32;
}
.yellow {
  background-color: #ffff00;
  box-shadow: 0 0 25px #ffd700;
}
.red {
  background-color: #ff0000;
  box-shadow: 0 0 25px #ff1493;
}
.off {
  background-color: #808080;
  box-shadow: 0 0 25px #808080;
}
</style>
