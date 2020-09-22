import { computed, inject, withModifiers } from "vue";

export default {
  name: "ch-tree-node",
  props: {
    data: Object
  },
  setup(props) {
    const { indent, methods, expandOnClickNode, treeState } = inject(
      "TREE_STATE"
    );
    let nodeStyle = computed(() => {
      return {
        paddingLeft: indent * (props.data.level - 1) + "px"
      };
    });
    let nodeClass = computed(() => [
      "expand-icon__wrapper",
      props.data.expanded && "expand",
      props.data.children && props.data.children.length ? "visibile" : "hidden"
    ]);
    const nodeContentClass = computed(() => {
      return [
        "ch-tree-node__content",
        treeState.currentNodeKey === props.data.key && "is-current"
      ];
    });
    const handleExpandNode = () => {
      methods.handleNodeExpand(props.data, !props.data.expanded);
    };
    const handleNodeClick = () => {
      expandOnClickNode &&
        props.data.children &&
        props.data.children.length &&
        methods.handleNodeExpand(props.data, !props.data.expanded);
      methods.handleNodeClick(props.data);
    };
    console.log(props.data._index >= treeState.showArrObj.start &&  props.data._index <= treeState.showArrObj.end && props.data._index)
    return () => (
      <div class="ch-tree-node" vShow={props.data.visibile && props.data._index >= treeState.showArrObj.start &&  props.data._index <= treeState.showArrObj.end }>
        <div
          class={nodeContentClass.value}
          style={nodeStyle.value}
          data-key={props.data.key}
          onClick={handleNodeClick}
        >
          <div
            class={nodeClass.value}
            onClick={withModifiers(handleExpandNode, ["stop"])}
          >
            <span class="iconfont icon-zhankai"></span>
          </div>
          {props.data.label}
        </div>
      </div>
    );
  }
};
