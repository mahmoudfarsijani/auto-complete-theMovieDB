<template>
  <div class=" w-[50%] relative h-[300px]">
    <input
      type="text"
      @input="searchInput"
      v-model="inputValue"
      placeholder="Search Movie"
      class="w-full px-[10px] py-[8px] rounded-lg outline-none text-[18px]"
      :class="[`${suggestions.length ? 'border-b-2  border-gray-300 absolute z-40 rounded-b-none' : ''}`]"
    />
    <ul v-if="suggestions.length" class="max-h-[250px] overflow-y-auto bg-white absolute py-[20px] right-0 left-0 top-[45px] flex flex-col gap-[10px] rounded-b-lg px-[10px] shadow-md">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectItem(suggestion)"
      >
        {{ suggestion.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { debounce } from "lodash";
import axios from "axios";

const inputValue = ref("");
const suggestions = ref([]);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTg3ZTg0ODZlMDEyMzk0MmQ5ZjUyNzU2MWFiMjQ3OCIsIm5iZiI6MTcyMTU2NDQyOS4wNDQ4MzYsInN1YiI6IjY1ZjZjMzFhZDhmNDRlMDE3YzUwMzM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIJBeJF1ybeeFJLdGEwAjU12cfRmURqwcgOCKaXYxWs",
  },
};

const fetchData = async () => {
  if (inputValue.value.length > 2) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue.value}&include_adult=false&language=en-US&page=1`,
        options
      );
      suggestions.value = await response.data.results;
    } catch (err) {
      console.log(err);
    }
  } else {
    suggestions.value = [];
  }
};

const debouncedFetchSuggestions = debounce(fetchData, 300);

watch(inputValue, () => {
  debouncedFetchSuggestions();
});

const selectItem = (suggest) => {
  inputValue.value = suggest.title;
  suggestions.value = [];
};

const searchInput = () => {
  debouncedFetchSuggestions();
  console.log(suggestions.value);
};
</script>
