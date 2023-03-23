import React, { useState, useEffect } from "react";
import "./App.css";
import linearClient from "./linear-client";
import { DecompositionTreeGraph } from "@ant-design/graphs";


function buildHierarchy(arr, parentId) {
  let hierarchy = [];
  for (let i = 0; i < arr.length; i++) {
    const { parent, title, ...props } = arr[i];
    if (parent === parentId || (parent && parent.id === parentId)) {
      const children = buildHierarchy(arr, arr[i].id);
      let node = {
        id: arr[i].id,
        value: {
          title,
          items: [
            // {
            //   text: 'Title',
            //   value: title
            // },
            {
              text: "Link",
              value: props.identifier,
            },
            {
              text: "Status",
              value: props.state.name,
            },
            {
              text: "Assignee",
              value: props.assignee ? props.assignee.name : "",
              icon: props.assignee ? props.assignee.avatarUrl : "",
            },
          ],
          percent: 1,
          // parentId,
          ...props,
        },
      };
      if (children.length) {
        node.children = [...children];
      }
      hierarchy.push(node);
    }
  }
  return hierarchy;
}

const Graph = ({projectId}) => {
  const [project, setProject] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      const projectInfo = await linearClient.client.rawRequest(`
        query Project($id: String!){
          project(id: $id) {
            name
            issues(first: 250) {
              nodes {
                id
                title
                identifier
                assignee {
                    avatarUrl
                    name
                }
                state {
                    color
                    name
                }
                parent {
                    id
                }
              }
            }
          }
        }`,
        { id: projectId }
      );
      setProject(projectInfo)
    }
    if (projectId) {
      console.log(projectId)
      fetchProject(projectId)
    }
  }, [projectId])

  if(!project) {
    return
  }

  const issues = project.data.project.issues.nodes;
  const hierarchy = buildHierarchy(issues, null);

  const data = {
    name: "root",
    value: {
      title: project.data.project.name,
      state: {},
    },
    children: hierarchy,
  };

  const config = {
    data,
    width: window.innerWidth,
    height: 2000,
    theme: "dark",
    behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
    onReady: (graph) => {
      // graph.update({theme: 'dark'})
      graph.on("node:contextmenu", (evt) => {
        window.open(
          `https://linear.app/pleo/issue/${evt.item._cfg.model.value.identifier}`,
          "_blank"
        );
      });
    },
    nodeCfg: {
      autoWidth: true,
      // label: {
      //   style: {
      //     fill: '#f00'
      //   }
      // },
      percent: {
        position: "top",
        style: (item) => {
          return {
            fill: item.value.state.color,
          };
        },
      },
      title: {
        containerStyle: {
          opacity: 0,
        },
        style: {
          fill: "#000",
        },
      },
      items: {
        style: (cfg, group, type) => {
          const styles = {
            value: {
              fill: "#000",
            },
            text: {
              fill: "#aaa",
            },
            icon: {
              width: 10,
              height: 10,
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
        },
      },
      style: (item) => {
        return {
          stroke: item && item.value && item.value.state.color,
        };
        // fill: 'red',  body bg
        // stroke: 'red', border
      },
    },
    edgeCfg: {
      endArrow: {
        fill: "#40a9ff",
      },
      style: (item, graph) => {
        /**
         * graph.findById(item.target).getModel()
         * item.source: 获取 source 数据
         * item.target: 获取 target 数据
         */
        // console.log(graph.findById(item.source).getModel());
        return {
          stroke: "#40a9ff",
          lineWidth: 1,
          strokeOpacity: 0.5,
        };
      },
    },
    markerCfg: (cfg) => {
      const { children } = cfg;
      return {
        show: children?.length,
      };
    },
    layout: {
      direction: "LR",
      getWidth: () => {
        return 360;
      },
      getHight: () => {
        return 260;
      },
      getVGap: () => {
        // The vertical clearance of each node is used in conjunction with the getHeight return value
        return 30;
      },
      getHGap: () => {
        // The vertical clearance of each node is used in conjunction with the getWidth return value
        return 150;
      },
    },
  };

  return <DecompositionTreeGraph {...config} />;
}
export default Graph
