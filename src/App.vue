<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'

export default defineComponent({
  name: 'LotterySimulator',
  setup() {
    const randomNumbers = ref<number[]>([])
    const userNumbers = ref<number[]>([1, 2, 3, 4, 5])
    const interval = ref<number>(100)
    let twoMatches = ref<number>(0)
    let threeMatches = ref<number>(0)
    let fourMatches = ref<number>(0)
    let fiveMatches = ref<number>(0)
    let nrOfTickets = ref<number>(0)
    let costOfTickets = ref<number>(0)
    let timeSpent = ref<number>(0)
    let is5matched = ref(false)
    // eslint-disable-next-line no-undef
    const intervalId = ref<NodeJS.Timeout | undefined>(undefined)

    function generateRandomNumbers() {
      const nums: number[] = []
      while (nums.length < 5) {
        const num = Math.ceil(Math.random() * 90)
        if (!nums.includes(num)) {
          nums.push(num)
        }
      }
      randomNumbers.value = nums
      checkUserNumbers(nums, userNumbers.value)
      nrOfTickets.value++
      costOfTickets.value = costOfTickets.value + 300
      timeSpent.value = timeSpent.value + 7
    }

    function checkUserNumbers(randomNumbers: number[], userNumbers: number[]) {
      const matchingNumbers = userNumbers.filter((num) => randomNumbers.includes(num))
      const count = matchingNumbers.length

      if (count === 2) {
        twoMatches.value++
      }
      if (count === 3) {
        threeMatches.value++
      }
      if (count === 4) {
        fourMatches.value++
      }
      if (count === 5) {
        fiveMatches.value++
        clearInterval(intervalId.value)
        is5matched.value = true
      }
    }

    function randomizeUserNumbers() {
      const nums: number[] = []
      while (nums.length < 5) {
        const num = Math.ceil(Math.random() * 90)
        if (!nums.includes(num)) {
          nums.push(num)
        }
      }
      userNumbers.value = nums
    }

    function startInterval() {
      clearInterval(intervalId.value)

      intervalId.value = setInterval(() => {
        generateRandomNumbers()
      }, interval.value)
    }

    watch(interval, () => {
      startInterval()
    })

    onMounted(() => {
      intervalId.value = setInterval(() => {
        generateRandomNumbers()
      }, interval.value)
    })

    return {
      randomNumbers,
      userNumbers,
      randomizeUserNumbers,
      interval,
      twoMatches,
      threeMatches,
      fourMatches,
      fiveMatches,
      nrOfTickets,
      costOfTickets,
      timeSpent,
      is5matched
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <main class="lg:w-full mx-auto pb-6">
      <!-- Title section -->
      <div
        class="flex justify-middle items-center gap-4 mb-4 p-4 bg-gradient-to-r from-mito-green to-mito-yellow text-white lg:w-full"
      >
        <img class="inline h-8 w-8" src="./assets/Mito1.png" alt="logo" />
        <h2 class="text-xl font-bold text-left inline -mt-1">Lottery Simulator</h2>
      </div>

      <!-- Stats section -->
      <section
        class="w-11/12 max-w-4xl m-auto bg-white p-4 drop-shadow-xl rounded-sm sm:rounded-3xl sm:px-24"
      >
        <h1 class="text-3xl font-bold mb-8 sm:mt-8 sm:mb-10 sm:text-4xl">Result</h1>
        <div class="bg-mint text-white rounded-lg p-4 mb-6 max-w-md mx-auto sm:mx-1">
          <div class="flex justify-between items-center mb-2 gap-4">
            <div class="text-lg font-semibold">Number of tickets:</div>
            <div class="text-xl font-bold w-6/12">{{ nrOfTickets }}</div>
          </div>
          <div class="flex justify-between items-center mb-2 gap-4">
            <div class="text-lg font-semibold">Years spent:</div>
            <div
              class="w-6/12 text-xl font-bold"
              :style="{
                color: is5matched ? 'red' : 'white',
                fontSize: is5matched ? '3em' : '1.25rem'
              }"
            >
              {{ Math.floor(timeSpent / 365) }}
            </div>
          </div>
          <div class="flex justify-between items-center gap-4">
            <div class="text-lg font-semibold">Cost of tickets:</div>
            <div class="text-xl font-bold w-6/12">
              {{ new Intl.NumberFormat().format(costOfTickets) }} Ft
            </div>
          </div>
        </div>

        <!-- Grid section -->
        <div class="grid grid-cols-2 sm:grid-cols-4 drop-shadow-sm max-w-lg mx-auto sm:mx-1">
          <div
            class="bg-white rounded-tl-lg py-4 text-center border-solid border-2 border-mito-yellow sm:rounded-l-lg"
          >
            <div class="text-lg font-semibold text-gray-800">2 matches</div>
            <div class="text-xl font-bold text-gray-800">{{ twoMatches }}</div>
          </div>
          <div
            class="bg-white rounded-tr-lg py-4 text-center border-solid border-2 border-mito-yellow sm:rounded-none"
          >
            <div class="text-lg font-semibold text-gray-800">3 matches</div>
            <div class="text-xl font-bold text-gray-800">{{ threeMatches }}</div>
          </div>
          <div
            class="bg-white rounded-bl-lg py-4 text-center border-solid border-2 border-mito-yellow sm:rounded-none"
          >
            <div class="text-lg font-semibold text-gray-800">4 matches</div>
            <div class="text-xl font-bold text-gray-800">{{ fourMatches }}</div>
          </div>
          <div
            class="bg-white rounded-br-lg py-4 text-center border-solid border-2 border-mito-yellow sm:rounded-r-lg"
          >
            <div class="text-lg font-semibold text-gray-800">5 matches</div>
            <div class="text-xl font-bold text-gray-800">{{ fiveMatches }}</div>
          </div>
        </div>
        <!-- Numbers section -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 w-full sm:justify-start">
          <p class="inline font-semibold">Winning numbers:</p>
          <ul class="flex flex-wrap gap-4">
            <li
              class="drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
              v-for="num in randomNumbers"
              :key="num"
            >
              {{ num }}
            </li>
          </ul>
        </div>
        <div
          class="flex flex-wrap items-center justify-between gap-4 py-4 w-full sm:justify-start sm:gap-11"
        >
          <p class="inline font-semibold">Your numbers:</p>

          <div class="flex flex-wrap gap-4">
            <p
              class="inline drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
            >
              {{ userNumbers[0] }}
            </p>
            <p
              class="inline drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
            >
              {{ userNumbers[1] }}
            </p>
            <p
              class="inline drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
            >
              {{ userNumbers[2] }}
            </p>
            <p
              class="inline drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
              id="num4"
            >
              {{ userNumbers[3] }}
            </p>
            <p
              class="inline drop-shadow-md border-solid border-2 border-mito-green rounded p-1 w-8 bg-white text-center"
            >
              {{ userNumbers[4] }}
            </p>
          </div>
        </div>
        <button
          class="transition-all duration-150 drop-shadow-md hover:drop-shadow-lg rounded-lg bg-gradient-to-r from-mito-green to-mito-yellow hover:to-mito-green text-white text-white font-bold p-3 my-4 active:text-black active:drop-shadow-sm"
          @click="randomizeUserNumbers"
        >
          Randomize User's Numbers
        </button>
        <div>
          <p class="font-semibold mb-4">Speed</p>
          <input
            type="range"
            id="interval"
            min="1"
            max="1000"
            step="10"
            v-model.number="interval"
          />
          <span>{{ interval }}ms</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
$mito-green: #a5d9c8;
$mito-yellow: #f4f0c6;

input[type='range'] {
  appearance: none;
  cursor: pointer;
  width: 100%;
}

input[type='range']::-moz-range-track {
  background: $mito-green;
  border-radius: 2rem;
  height: 1rem;
}
input[type='range']::-webkit-slider-runnable-track {
  background: $mito-green;
  border-radius: 2rem;
  height: 1rem;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-top: 2px; /* Centers thumb on the track */
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: none;
  background: whitesmoke;
  box-shadow: 0 0 4px 0 $mito-green;
}
input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: none;
  background: whitesmoke;
  box-shadow: 0 0 4px 0 $mito-green;
}

input[type='range']:focus::-webkit-slider-thumb {
  border: 1px solid $mito-green;
  outline: 3px solid $mito-yellow;
  outline-offset: 0.125rem;
}

input[type='range']:focus::-moz-range-thumb {
  border: 1px solid $mito-green;
  outline: 3px solid $mito-yellow;
  outline-offset: 0.125rem;
}
</style>
