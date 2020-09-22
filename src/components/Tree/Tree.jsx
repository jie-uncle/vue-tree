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
    let state = reactive({
      currentNodeKey: null,
      currentNode: null,
      expandedKeys: [],
      checkedKeys: []
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
      return {
        height: "0px"
      };
    });
    const virtualNodeBottomStyle = computed(() => {
      return {
        height: "0px"
      };
    });
    instance.ctx.$nextTick(() => {
      const treeNode = instance.ctx.$refs.treeNode;
      let parentHeight = treeNode.$el.parentNode.parentNode.getBoundingClientRect()
        .height;
      let nodeHeight = treeNode.$el.getBoundingClientRect().height;
      console.log(Math.ceil(parentHeight / nodeHeight));
      console.log(flaDataArr);
    });
    const renderNode = () => {
      return props.data && props.data.length ? (
        <div class="ch-tree__wrapper">
          <div
            class="ch-tree-virtual-node_top"
            style={virtualNodeTopStyle}
          ></div>
          {flaDataArr.map(item => (
            <ch-tree-node data={item.node} key={item.node.key} ref="treeNode" />
          ))}
          <div
            class="ch-tree-virtual-node_bottom"
            style={virtualNodeBottomStyle}
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
