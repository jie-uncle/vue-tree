import { computed, inject } from "vue";

export default {
  name: "ch-tree-node",
  props: {
    data: Object
  },
  setup(props) {
    const { indent, methods, expandOnClickNode } = inject("TREE_STATE");
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
    const handleExpandNode = () => {
      methods.handleNodeExpand(props.data, !props.data.expanded);
    };
    const handleNodeClick = () => {
      expandOnClickNode
        ? props.data.children &&
          props.data.children.length &&
          methods.handleNodeExpand(props.data, !props.data.expanded)
        : methods.handleNodeClick(props.data);
    };
    return () => (
      <div class="ch-tree-node">
        <div
          class="ch-tree-node__content"
          style={nodeStyle.value}
          data-key={props.data.key}
          onClick={handleNodeClick}
        >
          <div class={nodeClass.value} onClick={handleExpandNode}>
            <span class="iconfont icon-zhankai"></span>
          </div>
          {props.data.label}
        </div>
        {props.data.children &&
          props.data.children.length &&
          props.data.expanded && (
            <div class="ch-tree-node__children" vShow={props.data.expanded}>
              {props.data.children.map(childrenData => (
                <ch-tree-node data={childrenData} />
              ))}
            </div>
          )}
      </div>
    );
  }
};
