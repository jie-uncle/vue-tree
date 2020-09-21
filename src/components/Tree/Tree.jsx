import { provide, reactive } from "vue";
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
    let state = reactive({
      currentNodeKey: null,
      currentNode: null,
      expandedKeys: [],
      checkedKeys: []
    });
    const changeData = (data, level) => {
      return data.map(item => {
        item.level = level;
        item.expanded = false;
        item.disable = false;
        item.data = item;
        item.visibile = level === 1 ? true : false;
        if (item.children && item.children.length) {
          item.children = changeData(item.children, level + 1);
        }
        return item;
      });
    };
    let data = changeData(props.data, 1);
    let flaData = flattenTree(data, props.nodeKey);
    console.log(flaData);
    const Methods = {
      getNode(nodeKey) {
        return flaData[nodeKey].node;
      },
      handleNodeExpand(nodeData, expanded) {
        flaData[nodeData.key].node.expanded = expanded;
        Methods.changeNodeVisibile(nodeData.key, expanded);
      },
      changeNodeVisibile(parentNodeKey, flag) {
        flaData[parentNodeKey].node.children.map(item => {
          flaData[item.key].node.visibile = flag;
          if (
            flaData[item.key].node.children &&
            flaData[item.key].node.children.length &&
            (flag ? flaData[item.key].node.expanded : true)
          ) {
            Methods.changeNodeVisibile(item.key, flag);
          }
        });
      },
      handleNodeClick(nodeData) {
        state.currentNode = nodeData;
      }
    };
    provide("TREE_STATE", {
      indent: props.indent,
      expandOnClickNode: props.expandOnClickNode,
      methods: Methods,
      treeState: state
    });
    // const showData = flaData.filter;
    return () => (
      <div class="ch-tree__wrapper">
        {props.data && props.data.length ? (
          data.map(item => <ch-tree-node data={item} />)
        ) : (
          <div>暂时没有数据</div>
        )}
      </div>
    );
  }
};
