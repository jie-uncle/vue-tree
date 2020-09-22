import { provide, reactive, getCurrentInstance, computed } from "vue";
import TreeNode from "./TreeNode";
import { flattenTree } from "./util";
export default {
  name: "ch-tree",
  components: { [TreeNode.name]: TreeNode },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    indent: {
      type: Number,
      default: () => 12
    },
    expandOnClickNode: {
      type: Boolean,
      default: () => true
    },
    nodeKey: {
      type: String
    }
  },
  setup(props) {
    const instance = getCurrentInstance();
    let nodeHeight = 0;
    let parentHeight = 0;
    let state = reactive({
      currentNodeKey: null,
      currentNode: null,
      expandedKeys: [],
      checkedKeys: [],
      showArrObj: {
        start: 0,
        end: 20,
        sum: 20
      }
    });
    const changeData = (data, level) => {
      return data.map(item => {
        let obj = { ...item };
        item.level = level;
        item.expanded = false;
        item.disable = false;
        item.data = obj;
        item.visibile = level === 1 ? true : false;
        if (item.children && item.children.length) {
          item.children = changeData(item.children, level + 1);
        }
        return item;
      });
    };
    let { obj: flaDataObj, arr: flaDataArr } = flattenTree(
      changeData(props.data, 1),
      props.nodeKey
    );
    const Methods = {
      getNode(nodeKey) {
        return flaDataObj[nodeKey].node;
      },
      handleNodeExpand(nodeData, expanded) {
        flaDataObj[nodeData.key].node.expanded = expanded;
        Methods.changeNodeVisibile(nodeData.key, expanded);
        console.log(flaDataArr);
        calcShowArrEnd()
      },
      changeNodeVisibile(parentNodeKey, flag) {
        flaDataObj[parentNodeKey].node.children.map(item => {
          flaDataObj[item.key].node.visibile = flag;
          if (
            flaDataObj[item.key].node.children &&
            flaDataObj[item.key].node.children.length &&
            (flag ? flaDataObj[item.key].node.expanded : true)
          ) {
            Methods.changeNodeVisibile(item.key, flag);
          }
        });
      },
      handleNodeClick(nodeData) {
        state.currentNode = nodeData;
        state.currentNodeKey = nodeData.key;
        instance.emit("node-click", nodeData, nodeData.data);
      }
    };
    provide("TREE_STATE", {
      indent: props.indent,
      expandOnClickNode: props.expandOnClickNode,
      methods: Methods,
      treeState: state
    });
    const virtualNodeTopStyle = computed(() => {
      let visiableNodeNum = visiableData.value.findIndex(item => item.node._index === state.showArrObj.start);
      return {
        height: (visiableNodeNum * nodeHeight) +'px',
      };
    });
    const showArrData = computed(() => {
      return flaDataArr.slice(state.showArrObj.start,state.showArrObj.end+1)
    });
    const virtualNodeBottomStyle = computed(() => {
      let visiableNodeNum = visiableData.value.length - state.showArrObj.start - state.showArrObj.sum;
      return {
        height: visiableNodeNum <= 0 ? 0: (visiableNodeNum * nodeHeight) +'px'
      };
    });
    const visiableData = computed(()=>flaDataArr.filter(item => item.node.visibile))
    instance.ctx.$nextTick(() => {
      const treeNode = instance.ctx.$refs.treeNode;
      parentHeight = treeNode.$el.parentNode.parentNode.getBoundingClientRect()
        .height;
      nodeHeight = treeNode.$el.getBoundingClientRect().height;
      state.showArrObj.sum = Math.ceil(parentHeight / nodeHeight) +2
      console.log( treeNode )
      console.log( parentHeight )
      console.log( nodeHeight )
      instance.ctx.$el.parentNode.onscroll = (e)=>{
        let start = Math.floor(e.target.scrollTop/nodeHeight )
        start = start <= 2 ? 0 :start -2
        state.showArrObj.start = start
        calcShowArrEnd()
      }
      console.log(visiableData.value.length - state.showArrObj.end );
      console.log(instance.ctx.$el);
    });
    const calcShowArrEnd=()=>{
      let i = 0;
      for(let j =state.showArrObj.start;j<visiableData.value.length;j++){
        let element = visiableData.value[j]
        i = i+1
        if(i >= state.showArrObj.sum){
          console.log(j)
          state.showArrObj.end = element.node._index
          break 
        }
      }
      console.log(state.showArrObj)
    }
    const renderNode = () => {
      return props.data && props.data.length ? (
        <div class="ch-tree__wrapper">
          <div
            class="ch-tree-virtual-node_top"
            style={virtualNodeTopStyle.value}
          ></div>
          {showArrData.value.map((item,i) => (
            <ch-tree-node data={item.node} key={item.node.key} ref={item.node._index === state.showArrObj.start ?'treeNode':`treeNode${i}`} />
          ))}
          <div
            class="ch-tree-virtual-node_bottom"
            style={virtualNodeBottomStyle.value}
          ></div>
        </div>
      ) : (
          <div class="ch-tree__wrapper">暂时没有数据</div>
        );
    };
    // const showData = flaData.filter;
    return () => renderNode();
  }
};
