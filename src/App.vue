<template>
  <div>
    <div class="tree__wrapper">
      <ch-tree
        :data="data"
        :expandOnClickNode="true"
        :load="loadNode"
        @node-click="handleNodeClick"
      ></ch-tree>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      data: [
        {
          id: 1,
          label: "一级 1",
          type: "first",
          children: [{ id: 4, label: "二级 1-1", type: "secound" }]
        },
        {
          id: 2,
          type: "first",
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
              type: "secound",
              children: [
                { id: 9, label: "三级 2-1-1", type: "secound" },
                { id: 10, label: "三级 2-1-2", type: "secound" }
              ]
            },
            { id: 6, label: "二级 2-2", type: "secound" }
          ]
        },
        {
          id: 3,
          type: "first",
          label: "一级 3",
          children: [
            { id: 7, label: "二级 3-1", type: "secound" },
            { id: 8, label: "二级 3-2", type: "secound" }
          ]
        },
        { id: "a", label: "一级 1a", type: "first" },
        { id: "b", label: "一级 1b", type: "first" },
        { id: "c", label: "一级 1c", type: "first" },
        { id: "d", label: "一级 1d", type: "first" },
        { id: "e", label: "一级 1e", type: "first" },
        { id: "f", label: "一级 1f", type: "first" },
        { id: "g", label: "一级 1g", type: "first" },
        { id: "h", label: "一级 1h", type: "first" },
        { id: "i", label: "一级 1i", type: "first" },
        { id: "j", label: "一级 1j", type: "first" },
        { id: "k", label: "一级 1k", type: "first" },
        { id: "l", label: "一级 1l", type: "first" },
        { id: "m", label: "一级 1m", type: "first" },
        { id: "n", label: "一级 1n", type: "first" },
        { id: "o", label: "一级 1o", type: "first" },
        { id: "p", label: "一级 1p", type: "first" },
        { id: "q", label: "一级 1q", type: "first" },
        { id: "r", label: "一级 1r", type: "first" },
        { id: "s", label: "一级 1s", type: "first" },
        { id: "t", label: "一级 1t", type: "first" },
        { id: "u", label: "一级 1u", type: "first" },
        { id: "v", label: "一级 1v", type: "first" },
        { id: "w", label: "一级 1w", type: "first" },
        { id: "x", label: "一级 1x", type: "first" },
        { id: "y", label: "一级 1y", type: "first" },
        { id: "z", label: "一级 1z", type: "first" },
        { id: "aa", label: "一级 1aa", type: "first" },
        { id: "bb", label: "一级 1bb", type: "first" },
        { id: "cc", label: "一级 1cc", type: "first" },
        { id: "dd", label: "一级 1dd", type: "first" },
        { id: "ee", label: "一级 1ee", type: "first" },
        { id: "ff", label: "一级 1ff", type: "first" },
        { id: "gg", label: "一级 1gg", type: "first" },
        { id: "hh", label: "一级 1hh", type: "first" },
        { id: "ii", label: "一级 1ii", type: "first" },
        { id: "jj", label: "一级 1jj", type: "first" }
      ]
    });
    const handleNodeClick = (node, data) => {
      console.log(node, data);
    };

    const addData = i => {
      let arr2 = [];
      for (let j = 10000 + i; j < 10000 + i + 10; j++) {
        arr2.push({
          id: j,
          label: "二级 " + i + "-" + j,
          type: "secound"
        });
      }
      return arr2;
    };
    let arr = [];
    for (let i = 0; i < 200; i++) {
      let arr2 = addData(i);
      arr.push({
        id: i,
        label: "一级 " + i,
        type: "first",
        children: [...arr2]
      });
    }

    state.data = [...arr];
    console.log(arr)

    const loadNode = () => {};
    return { ...toRefs(state), handleNodeClick, loadNode };
  }
};
</script> <style lang="stylus">
.tree__wrapper {
  height: 400px;
  width: 200px;
  overflow: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}</style>