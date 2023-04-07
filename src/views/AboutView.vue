<template>
  <div>
    <h1>Lotto Simulator</h1>
    <div>
      <p>Winning Numbers:</p>
      <ul>
        <li v-for="num in randomNumbers" :key="num">{{ num }}</li>
      </ul>
    </div>
    <div>
      <label for="num1">Number 1:</label>
      <input type="number" id="num1" v-model.number="userNumbers[0]" />
    </div>
    <div>
      <label for="num2">Number 2:</label>
      <input type="number" id="num2" v-model.number="userNumbers[1]" />
    </div>
    <div>
      <label for="num3">Number 3:</label>
      <input type="number" id="num3" v-model.number="userNumbers[2]" />
    </div>
    <div>
      <label for="num4">Number 4:</label>
      <input type="number" id="num4" v-model.number="userNumbers[3]" />
    </div>
    <div>
      <label for="num5">Number 5:</label>
      <input type="number" id="num5" v-model.number="userNumbers[4]" />
    </div>
    <div>
      <label for="interval">Interval:</label>
      <input
        type="range"
        id="interval"
        min="10"
        max="1000"
        step="10"
        v-model.number="interval"
      />
      <span>{{ interval }}ms</span>
    </div>
    <div>
      <h3>2 matches</h3>
      <h3>{{ twoMatches }}</h3>
    </div>
    <div>
      <h3>3 matches</h3>
      <h3>{{ threeMatches }}</h3>
    </div>
    <div>
      <h3>4 matches</h3>
      <h3>{{ fourMatches }}</h3>
    </div>
    <div>
      <h3>5 matches</h3>
      <h3>{{ fiveMatches }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "LottoSimulator",
  setup() {
    const randomNumbers = ref<number[]>([]);
    const userNumbers = ref<number[]>([1, 2, 3, 4, 5]);
    const interval = ref<number>(100);
    let twoMatches = ref<number>(0);
    let threeMatches = ref<number>(0);
    let fourMatches = ref<number>(0);
    let fiveMatches = ref<number>(0);

    function generateRandomNumbers() {
      const nums: number[] = [];
      while (nums.length < 5) {
        const num = Math.floor(Math.random() * 91);
        if (!nums.includes(num)) {
          nums.push(num);
        }
      }
      randomNumbers.value = nums;
      checkUserNumbers(nums, userNumbers.value);
    }

    function checkUserNumbers(randomNumbers: number[], userNumbers: number[]) {
      let count = 0;
      for (let i = 0; i < randomNumbers.length; i++) {
        if (userNumbers.includes(randomNumbers[i])) {
          count++;

          if (count === 2) {
            twoMatches.value++;
          }
          if (count === 3) {
            threeMatches.value++;
          }
          if (count === 4) {
            fourMatches.value++;
          }
          if (count === 5) {
            fiveMatches.value++;
          }
        }
      }
    }

    watch(interval, (newValue, oldValue) => {
      if (oldValue) {
        clearInterval(intervalId.value);
      }
      intervalId.value = setInterval(() => {
        generateRandomNumbers();
      }, newValue);
    });

    const intervalId = ref<number | null>(null);

    generateRandomNumbers();

    return {
      randomNumbers,
      userNumbers,
      interval,
      twoMatches,
      threeMatches,
      fourMatches,
      fiveMatches,
    };
  },
});
</script>
